import { useState } from "react";
import {
  ToolLayout,
  ToolPanel,
  ToolButton,
  ToolInput,
  ToolTextArea,
  ToolSelect,
  ToolLabel,
  ToolSection,
  ToolGrid,
} from "~/components/tool-layout";

type CryptoMode = 'encrypt' | 'decrypt' | 'hash' | 'sign';

export default function CryptoTools() {
  const [mode, setMode] = useState<CryptoMode>('encrypt');
  const [algorithm, setAlgorithm] = useState('AES-GCM');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const algorithms = {
    symmetric: [
      { value: 'AES-GCM', label: 'AES-GCM' },
      { value: 'AES-CBC', label: 'AES-CBC' },
      { value: 'ChaCha20', label: 'ChaCha20' },
    ],
    asymmetric: [
      { value: 'RSA-OAEP', label: 'RSA-OAEP' },
      { value: 'ECDH', label: 'ECDH' },
    ],
    hash: [
      { value: 'SHA-256', label: 'SHA-256' },
      { value: 'SHA-384', label: 'SHA-384' },
      { value: 'SHA-512', label: 'SHA-512' },
      { value: 'SHA3-256', label: 'SHA3-256' },
      { value: 'SHA3-384', label: 'SHA3-384' },
      { value: 'SHA3-512', label: 'SHA3-512' },
    ],
    sign: [
      { value: 'RSA-PSS', label: 'RSA-PSS' },
      { value: 'ECDSA', label: 'ECDSA' },
      { value: 'Ed25519', label: 'Ed25519' },
    ],
  };

  const modes: Array<{ id: CryptoMode; name: string }> = [
    { id: 'encrypt', name: '加密' },
    { id: 'decrypt', name: '解密' },
    { id: 'hash', name: '哈希' },
    { id: 'sign', name: '签名' },
  ];

  // 生成随机密钥
  const generateKey = async () => {
    try {
      setError(null);
      let key;
      switch (algorithm) {
        case 'AES-GCM':
        case 'AES-CBC':
          key = await window.crypto.subtle.generateKey(
            {
              name: algorithm,
              length: 256,
            },
            true,
            ['encrypt', 'decrypt'],
          );
          const exported = await window.crypto.subtle.exportKey('raw', key);
          setKey(btoa(String.fromCharCode(...new Uint8Array(exported))));
          break;
        case 'RSA-OAEP':
          key = await window.crypto.subtle.generateKey(
            {
              name: 'RSA-OAEP',
              modulusLength: 2048,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: 'SHA-256',
            },
            true,
            ['encrypt', 'decrypt'],
          );
          const publicKey = await window.crypto.subtle.exportKey('spki', key.publicKey);
          setKey(btoa(String.fromCharCode(...new Uint8Array(publicKey))));
          break;
        default:
          throw new Error('不支持的算法');
      }
    } catch (err) {
      setError('生成密钥失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  // 生成随机 IV
  const generateIv = () => {
    try {
      setError(null);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      setIv(btoa(String.fromCharCode(...iv)));
    } catch (err) {
      setError('生成 IV 失败: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const processData = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!input) throw new Error('请输入需要处理的数据');

      if (mode === 'hash') {
        const data = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setOutput(hashHex);
        return;
      }

      // 对于非哈希操作，需要密钥
      if (!key && (mode === 'encrypt' || mode === 'decrypt' || mode === 'sign')) {
        throw new Error('请输入密钥');
      }

      // 对于加密和解密操作，如果是 AES 算法，需要 IV
      if (
        (mode === 'encrypt' || mode === 'decrypt') &&
        (algorithm === 'AES-GCM' || algorithm === 'AES-CBC') &&
        !iv
      ) {
        throw new Error('请输入 IV');
      }

      const keyData = atob(key);
      const keyArray = new Uint8Array(keyData.split('').map((c) => c.charCodeAt(0)));

      let cryptoKey: CryptoKey;

      if (algorithm.startsWith('AES')) {
        try {
          const importedKey = await window.crypto.subtle.importKey(
            'raw',
            keyArray,
            {
              name: algorithm,
              length: 256,
            },
            false,
            [mode === 'encrypt' ? 'encrypt' : 'decrypt'],
          );

          if (!importedKey) {
            throw new Error('密钥导入失败');
          }

          cryptoKey = importedKey;
        } catch (err) {
          throw new Error('无效的密钥格式');
        }
      } else {
        throw new Error('不支持的算法');
      }

      if (mode === 'encrypt') {
        const data = new TextEncoder().encode(input);
        const ivArray = new Uint8Array(atob(iv).split('').map((c) => c.charCodeAt(0)));

        if (!cryptoKey) {
          throw new Error('密钥初始化失败');
        }

        const encrypted = await window.crypto.subtle.encrypt(
          { name: algorithm, iv: ivArray },
          cryptoKey,
          data,
        );

        setOutput(btoa(String.fromCharCode(...new Uint8Array(encrypted))));
      } else if (mode === 'decrypt') {
        try {
          const data = new Uint8Array(atob(input).split('').map((c) => c.charCodeAt(0)));
          const ivArray = new Uint8Array(atob(iv).split('').map((c) => c.charCodeAt(0)));

          if (!cryptoKey) {
            throw new Error('密钥初始化失败');
          }

          const decrypted = await window.crypto.subtle.decrypt(
            { name: algorithm, iv: ivArray },
            cryptoKey,
            data,
          );

          setOutput(new TextDecoder().decode(decrypted));
        } catch (err) {
          throw new Error('解密失败：数据格式错误或密钥不正确');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理过程中发生错误');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="加密工具"
      description="提供安全可靠的数据加密和解密功能，支持多种加密算法和模式。"
      badge="加密解密"
    >
      <ToolGrid cols={2}>
        {/* 左侧面板 */}
        <div className="space-y-6">
          <ToolPanel>
            <ToolSection title="操作模式">
              <div className="grid grid-cols-4 gap-4">
                {modes.map((m) => (
                  <ToolButton
                    key={m.id}
                    active={mode === m.id}
                    onClick={() => {
                      setMode(m.id);
                      setError(null);
                    }}
                  >
                    {m.name}
                  </ToolButton>
                ))}
              </div>
            </ToolSection>

            <ToolSection title="加密算法">
              <ToolSelect
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                options={
                  mode === 'hash'
                    ? algorithms.hash
                    : mode === 'sign'
                    ? algorithms.sign
                    : [...algorithms.symmetric, ...algorithms.asymmetric]
                }
              />
            </ToolSection>

            <ToolSection title="密钥设置">
              <div className="space-y-4">
                <div className="space-y-2">
                  <ToolLabel>密钥</ToolLabel>
                  <ToolInput
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="请输入密钥"
                  />
                </div>

                {(algorithm === 'AES-CBC' || algorithm === 'AES-GCM') && (
                  <div className="space-y-2">
                    <ToolLabel>初始向量 (IV)</ToolLabel>
                    <ToolInput
                      value={iv}
                      onChange={(e) => setIv(e.target.value)}
                      placeholder="请输入初始向量"
                    />
                  </div>
                )}
              </div>
            </ToolSection>

            <ToolSection title="生成密钥和 IV">
              <div className="grid grid-cols-2 gap-4">
                <ToolButton onClick={generateKey}>生成密钥</ToolButton>
                {(algorithm === 'AES-CBC' || algorithm === 'AES-GCM') && (
                  <ToolButton onClick={generateIv}>生成 IV</ToolButton>
                )}
              </div>
            </ToolSection>
          </ToolPanel>

          <ToolButton
            onClick={processData}
            fullWidth
            className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 py-3"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-violet-300 border-t-transparent mr-2" />
                处理中...
              </div>
            ) : mode === 'hash' ? (
              '计算哈希'
            ) : mode === 'sign' ? (
              '生成签名'
            ) : mode === 'encrypt' ? (
              '加密数据'
            ) : (
              '解密数据'
            )}
          </ToolButton>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* 右侧面板 */}
        <div className="space-y-6">
          <ToolPanel>
            <ToolSection title="输入数据">
              <ToolTextArea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === 'hash'
                    ? '请输入要计算哈希的数据'
                    : mode === 'sign'
                    ? '请输入要生成签名的数据'
                    : mode === 'encrypt'
                    ? '请输入要加密的数据'
                    : '请输入要解密的数据'
                }
                className="h-[200px]"
              />
            </ToolSection>
          </ToolPanel>

          <ToolPanel>
            <ToolSection title="输出结果">
              <ToolTextArea
                value={output}
                readOnly
                placeholder="处理结果将显示在这里..."
                className="h-[200px]"
              />
            </ToolSection>
          </ToolPanel>
        </div>
      </ToolGrid>
    </ToolLayout>
  );
}
