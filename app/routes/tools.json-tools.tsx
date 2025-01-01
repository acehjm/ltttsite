import { useState, useEffect, useRef } from "react";
import {
  ToolLayout,
  ToolPanel,
  ToolButton,
  ToolTextArea,
  ToolSection,
  ToolGrid,
} from "~/components/tool-layout";
import { AnimatePresence, motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function JsonTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("format");
  const [visualMode, setVisualMode] = useState("tree");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<ChartJS | null>(null);

  const modes = [
    { id: "format", name: "格式化" },
    { id: "minify", name: "压缩" },
    { id: "visualize", name: "可视化" },
    { id: "convert", name: "转换" },
  ];

  const visualModes = [
    { id: "tree", name: "树形视图" },
    { id: "chart", name: "图表视图" },
  ];

  useEffect(() => {
    // Cleanup chart on unmount
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  const processJson = () => {
    setError("");
    setLoading(true);
    try {
      const parsedData = JSON.parse(input);
      
      switch (mode) {
        case "format":
          setOutput(JSON.stringify(parsedData, null, 2));
          break;
        case "minify":
          setOutput(JSON.stringify(parsedData));
          break;
        case "visualize":
          if (visualMode === "tree") {
            setOutput(JSON.stringify(parsedData, null, 2));
          } else {
            setOutput(JSON.stringify(parsedData));
            renderChart(parsedData);
          }
          break;
        case "convert":
          // Convert to XML or YAML based on selection
          setOutput(convertToXml(parsedData));
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (data: any) => {
    if (!chartRef.current) return;

    // Cleanup previous chart
    if (chart) {
      chart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (Array.isArray(data)) {
      // Create bar chart for arrays
      const newChart = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: data.map((_, i) => `索引 ${i}`),
          datasets: [{
            label: '数值',
            data: data,
            backgroundColor: Array(data.length).fill('rgba(139, 92, 246, 0.5)'),
            borderColor: Array(data.length).fill('rgba(139, 92, 246, 1)'),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(161, 161, 170, 0.1)'
              },
              ticks: {
                color: 'rgb(161, 161, 170)'
              }
            },
            x: {
              grid: {
                color: 'rgba(161, 161, 170, 0.1)'
              },
              ticks: {
                color: 'rgb(161, 161, 170)'
              }
            }
          }
        }
      });
      setChart(newChart);
    } else if (typeof data === 'object' && data !== null) {
      // Create pie chart for objects
      const entries = Object.entries(data);
      const newChart = new ChartJS(ctx, {
        type: 'pie',
        data: {
          labels: entries.map(([key]) => key),
          datasets: [{
            data: entries.map(([_, value]) => typeof value === 'number' ? value : 1),
            backgroundColor: entries.map((_, i) => 
              `hsla(${(i * 360) / entries.length}, 70%, 60%, 0.5)`
            ),
            borderColor: entries.map((_, i) => 
              `hsla(${(i * 360) / entries.length}, 70%, 60%, 1)`
            ),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right' as const,
              labels: {
                color: 'rgb(161, 161, 170)'
              }
            }
          }
        }
      });
      setChart(newChart);
    }
  };

  const convertToXml = (obj: any, indent = ''): string => {
    if (typeof obj !== 'object' || obj === null) {
      return String(obj);
    }
    
    let xml = '';
    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(item => {
          xml += `${indent}<${key}>${convertToXml(item, indent + '  ')}</${key}>\n`;
        });
      } else if (typeof value === 'object' && value !== null) {
        xml += `${indent}<${key}>\n${convertToXml(value, indent + '  ')}${indent}</${key}>\n`;
      } else {
        xml += `${indent}<${key}>${value}</${key}>\n`;
      }
    }
    return xml;
  };

  return (
    <ToolLayout
      title="JSON 工具"
      description="格式化、压缩、可视化和转换 JSON 数据的在线工具。"
      badge="JSON"
    >
      <ToolGrid cols={2}>
        {/* 左侧面板 */}
        <div className="space-y-6">
          <ToolPanel>
            <ToolSection title="操作">
              <div className="grid grid-cols-3 gap-4">
                {modes.map((m) => (
                  <ToolButton
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      setError("");
                    }}
                  >
                    {m.name}
                  </ToolButton>
                ))}
              </div>
            </ToolSection>

            {mode === "visualize" && (
              <ToolSection title="可视化模式">
                <div className="grid grid-cols-3 gap-4">
                  {visualModes.map((vm) => (
                    <ToolButton
                      key={vm.id}
                      onClick={() => {
                        setVisualMode(vm.id);
                        setError("");
                      }}
                    >
                      {vm.name}
                    </ToolButton>
                  ))}
                </div>
              </ToolSection>
            )}

            <ToolSection title="输入数据">
              <ToolTextArea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                placeholder="请输入 JSON 数据..."
                className="h-[400px]"
              />
            </ToolSection>

            <ToolSection title="处理">
              <ToolButton onClick={processJson} disabled={loading}>
                {loading ? "处理中..." : "处理"}
              </ToolButton>
            </ToolSection>
          </ToolPanel>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* 右侧面板 */}
        <ToolPanel>
          <ToolSection title="输出结果">
            {mode === "visualize" && visualMode === "chart" ? (
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <canvas
                  ref={chartRef}
                  className="w-full h-[400px]"
                />
              </div>
            ) : (
              <ToolTextArea
                value={output}
                readOnly
                placeholder="处理结果将显示在这里..."
                className="h-[500px]"
              />
            )}
          </ToolSection>
        </ToolPanel>
      </ToolGrid>
    </ToolLayout>
  );
}
