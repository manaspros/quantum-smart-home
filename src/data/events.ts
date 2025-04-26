export interface SmartHomeEvent {
  id: string;
  timestamp: string;
  eventType: string;
  details: string;
}

export const mockEvents: SmartHomeEvent[] = [
  {
    id: "1",
    timestamp: "2025-04-25T08:30:45Z",
    eventType: "Light ON",
    details: "Living Room Light turned on by presence detection",
  },
  {
    id: "2",
    timestamp: "2025-04-25T09:15:22Z",
    eventType: "Movement Detected",
    details: "Motion detected in the hallway during armed state",
  },
  {
    id: "3",
    timestamp: "2025-04-25T10:20:10Z",
    eventType: "Access Granted",
    details: "Method: Fingerprint, UserID: 101",
  },
  {
    id: "4",
    timestamp: "2025-04-25T11:05:37Z",
    eventType: "Access Denied",
    details: "Method: FaceRec, Reason: Unknown user",
  },
  {
    id: "5",
    timestamp: "2025-04-25T12:45:19Z",
    eventType: "Temperature Change",
    details: "Living Room temperature adjusted to 72°F",
  },
  {
    id: "6",
    timestamp: "2025-04-25T14:30:08Z",
    eventType: "Door Locked",
    details: "Front door auto-locked, Quantum encryption enabled",
  },
  {
    id: "7",
    timestamp: "2025-04-25T15:50:42Z",
    eventType: "Security Alert",
    details: "Unusual access pattern detected, notification sent to admin",
  },
  {
    id: "8",
    timestamp: "2025-04-25T17:20:15Z",
    eventType: "Energy Usage",
    details: "Peak energy usage detected in Kitchen, smart reduction initiated",
  },
  {
    id: "9",
    timestamp: "2025-04-25T18:10:33Z",
    eventType: "Voice Command",
    details: "Voice command recognized: 'Set evening mode'",
  },
  {
    id: "10",
    timestamp: "2025-04-25T20:05:57Z",
    eventType: "System Update",
    details: "Quantum security module updated to version 3.2.1",
  },
];
