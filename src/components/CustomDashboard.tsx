import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mockEvents, SmartHomeEvent } from "../data/events";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth/CustomAuthProvider";

const CustomDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState<SmartHomeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Simulate API call to fetch event data
    // In a production environment, this would be replaced with an actual API call
    // that includes the auth token
    // Example:
    // const token = authService.getAccessToken();
    // fetch('https://api.quantum-smart-home.com/events', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    const fetchEvents = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvents(mockEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format the timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  // Get the appropriate chip color based on event type
  const getEventTypeColor = (eventType: string) => {
    switch (true) {
      case eventType.includes("Alert"):
      case eventType.includes("Denied"):
        return "error";
      case eventType.includes("Granted"):
      case eventType.includes("ON"):
        return "success";
      case eventType.includes("Detected"):
      case eventType.includes("Security"):
        return "warning";
      default:
        return "info";
    }
  };

  // Get the user's name from the token payload
  const getUserName = () => {
    if (user) {
      return user.name || user.nickname || user.email || "User";
    }
    return "User";
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      <Box
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SecurityIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ mb: 0 }}
              >
                Quantum-Secured Dashboard
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              Welcome, {getUserName()}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => logout()}
            sx={{
              borderColor: "rgba(255,255,255,0.5)",
              alignSelf: { xs: "flex-start", sm: "center" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EventIcon sx={{ mr: 1 }} /> Smart Home Event Log
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          All events are protected with quantum encryption and authenticated for
          maximum security.
        </Typography>
      </Box>

      {loading ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
          <Typography>Loading secure event data...</Typography>
        </Paper>
      ) : events.length === 0 ? (
        <Alert severity="info">No events have been recorded yet.</Alert>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ overflow: "hidden" }}
        >
          <Table
            sx={{ minWidth: isMobile ? 300 : 650 }}
            aria-label="event log table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    Timestamp
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EventIcon fontSize="small" sx={{ mr: 1 }} />
                    Event Type
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                    Details
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  }}
                  className={`event-row ${
                    event.eventType.includes("Alert")
                      ? "event-row-alert"
                      : event.eventType.includes("Access")
                      ? "event-row-access"
                      : ""
                  }`}
                >
                  <TableCell>{formatTimestamp(event.timestamp)}</TableCell>
                  <TableCell>
                    <Chip
                      label={event.eventType}
                      color={
                        getEventTypeColor(event.eventType) as
                          | "default"
                          | "primary"
                          | "secondary"
                          | "error"
                          | "info"
                          | "success"
                          | "warning"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{event.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Quantum-Secured IoT-Based Smart Home System &copy;{" "}
          {new Date().getFullYear()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Data secured with quantum encryption technology
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomDashboard;
