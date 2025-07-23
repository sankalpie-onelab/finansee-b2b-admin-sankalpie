import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import SecurityIcon from '@mui/icons-material/Security';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SegmentCard = ({ segment }: { segment: any }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#f5f5f5',
                p: 3,
                maxWidth: 600,
                margin: '2rem auto',
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <InsightsIcon sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        {segment.name}
                    </Typography>
                    <Chip label={`${segment.percentage}%`} sx={{ ml: 2 }} color="primary" />
                </Box>

                {segment.riskLevels.map((risk: any, i: number) => (
                    <Box key={i} ml={4} mb={2}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <SecurityIcon sx={{ color: '#2e7d32', mr: 1 }} />
                            <Typography variant="body1">
                                Risk Level: <strong>{risk.name}</strong>
                            </Typography>
                            <Chip
                                label={`${risk.percentage}%`}
                                sx={{ ml: 2 }}
                                color="success"
                            />
                        </Box>

                        {risk.biases.map((bias: any, j: number) => (
                            <Box key={j} ml={4} mb={1}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <PsychologyIcon sx={{ color: '#ed6c02', mr: 1 }} />
                                    <Typography variant="body1">
                                        Bias: <strong>{bias.name}</strong>
                                    </Typography>
                                    <Chip
                                        label={`${bias.percentage}%`}
                                        sx={{ ml: 2 }}
                                        color="warning"
                                    />
                                </Box>
                                <Box ml={4} display="flex" alignItems="center">
                                    <CheckCircleIcon sx={{ color: '#0288d1', mr: 1 }} />
                                    <Typography variant="body1">
                                        Recommended Product:{' '}
                                        <strong>{bias.product}</strong>
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default SegmentCard;
