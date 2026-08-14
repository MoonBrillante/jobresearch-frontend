import { useState } from "react";
import { Box, Tabs, Tab, Button, Stack } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../types";
import { getJobs } from "../api/jobapi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

export function normalizeRole(position: string): string {
    const normalizedPosition = position.toLowerCase();

    if (
        normalizedPosition.includes('support') ||
        normalizedPosition.includes('helpdesk') ||
        normalizedPosition.includes('help desk')
    ) {
        return 'Support / Technical Support';
    }

    if (
        normalizedPosition.includes('full stack') ||
        normalizedPosition.includes('full-stack') ||
        normalizedPosition.includes('fullstack')
    ) {
        return 'Full Stack Developer';
    }

    if (
        normalizedPosition.includes('frontend') ||
        normalizedPosition.includes('front-end') ||
        normalizedPosition.includes('front end') ||
        (normalizedPosition.includes('react') && !normalizedPosition.includes('backend') && !normalizedPosition.includes('back-end'))
    ) {
        return 'Frontend Developer';
    }

    if (
        normalizedPosition.includes('backend') ||
        normalizedPosition.includes('back-end') ||
        normalizedPosition.includes('back end')
    ) {
        return 'Backend Developer';
    }

    if (
        normalizedPosition.includes('software engineer') ||
        normalizedPosition.includes('software developer')
    ) {
        return 'Software Engineer';
    }

    if (normalizedPosition.includes('web developer')) {
        return 'Web Developer';
    }

    if (normalizedPosition.includes('sap') || normalizedPosition.includes('abap')) {
        return 'SAP / ERP';
    }

    if (normalizedPosition.includes('java developer') || normalizedPosition.includes('java engineer')) {
        return 'Java Developer';
    }

    return 'Other';
}

export default function DashboardTabs() {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    
    const {
        data: jobs = [],
        isLoading,
        isError,
    } = useQuery<Job[]>({
        queryKey: ["jobs"],
        queryFn: getJobs,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading jobs.</div>;

    const groupCountBy = (key: keyof Job, fallbackLabel = 'Unknown', topN = 15) => {
        const map = new Map<string, number>();

        jobs.forEach((job) => {
            const rawKey = job[key];
            const rawValue = rawKey ? String(rawKey) : fallbackLabel;

            const groupKey = key === 'position' ? normalizeRole(rawValue) : rawValue;

            map.set(groupKey, (map.get(groupKey) || 0) + 1);
        });

        // Sorting logic
        const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

        if (sorted.length <= topN) {
            return {
                labels: sorted.map(([label]) => label),
                counts: sorted.map(([, count]) => count),
            };
        }

        const top = sorted.slice(0, topN);
        const otherCount = sorted.slice(topN).reduce((sum, [, count]) => sum + count, 0);
        const otherRolesCount = sorted.slice(topN).length;

        return {
            labels: [...top.map(([label]) => label), `Other (${otherRolesCount} more)`],
            counts: [...top.map(([, count]) => count), otherCount],
        };
    };

    const groupCountByArrayField = (key: 'skills' | 'tools') => {
        const map = new Map<string, number>();

        jobs.forEach((job) => {
            const values = job[key];
            if (!Array.isArray(values)) return;
            values.forEach((value) => {
                if (!value) return;
                map.set(value, (map.get(value) || 0) + 1);
            });
        });

        const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

        return {
            labels: sorted.map(([label]) => label),
            counts: sorted.map(([, count]) => count),
        };
    };

    const getTopLabel = (labels: string[]) => {
        return labels.length > 0 ? labels[0] : 'N/A';
    };

    const bySkills = groupCountByArrayField('skills');
    const byPosition = groupCountBy('position', 'Unknown Position');
    const byMode = groupCountBy('mode', 'Unknown Mode');

    const getChartData = (
        labels: string[],
        counts: number[],
        label: string,
        backgroundColor: string,
    ) => ({
        labels,
        datasets: [
            {
                label,
                data: counts,
                backgroundColor,
            },
        ],
    });

    const getChartOptions = () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
        },
    });
    const totalApplications = jobs.length;
    const topTargetRole = getTopLabel(byPosition.labels);
    const topSkill = getTopLabel(bySkills.labels);
    const topWorkMode = getTopLabel(byMode.labels);
    const summaryCards = [
        {
            title: 'Total Jobs',
            value: totalApplications,
        },
        {
            title: 'Top Target Role',
            value: topTargetRole,
        },
        {
            title: 'Top Skill',
            value: topSkill,
        },
        {
            title: 'Top Work Mode',
            value: topWorkMode,
        },
    ];
    return (
        <Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 3, px: 2 }}
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/jobs")}
                    sx={{ textTransform: "none" }}
                >
                Back to Job List
                </Button>

                <Tabs 
                    value={tab} 
                    onChange={(_, newVal) => setTab(newVal)} 
                    centered 
                    sx={{"& .MuiTab-root": {
                        textTransform: "none",
                                            },
                        }}>
                    <Tab label="📌 Summary" />
                    <Tab label="🛠️ Top Skills" />
                    <Tab label="💼 Target Roles" />
                    <Tab label="🌍 Work Mode" />
                </Tabs>
            </Stack>
            <div
                style={{
                    paddingTop: "2rem",
                    height: "400px",
                    width: "80%",
                    margin: "2rem auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {tab === 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        {summaryCards.map((card) => (
                            <Box
                                key={card.title}
                                sx={{
                                    p: 2,
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: 14,
                                        color: 'text.secondary',
                                        mb: 1,
                                    }}
                                >
                                    {card.title}
                                </Box>

                                <Box
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 600,
                                    }}
                                >
                                    {card.value}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
                {tab === 1 && (
                    <Bar
                        data={getChartData(
                            bySkills.labels,
                            bySkills.counts,
                            "Top Skills Bar",
                            "rgba(255, 99, 132, 0.5)",
                        )}
                        options={getChartOptions()}
                    />
                )}
                {tab === 2 && (
                    <Bar
                        data={getChartData(
                            byPosition.labels,
                            byPosition.counts,
                            "Target Roles Bar",
                            "rgba(54, 162, 235, 0.5)",
                        )}
                        options={getChartOptions()}
                    />
                )}
                {tab === 3 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Pie
                            data={{
                                labels: byMode.labels,
                                datasets: [
                                    {
                                        label: "Work Mode Distribution",
                                        data: byMode.counts,
                                        backgroundColor: ['#4caf50',
                                            '#2196f3',
                                            '#ff9800',
                                            '#9e9e9e',
                                        ]
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const value = context.parsed;
                                                const total = context.dataset.data.reduce(
                                                    (sum, val) => sum + val,
                                                    0,
                                                );
                                                const percent = ((value / total) * 100).toFixed(1);
                                                const label = context.label || "Unknown Work Mode";
                                                return `${label}: ${value} (${percent}%)`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </Box>
    );
}


