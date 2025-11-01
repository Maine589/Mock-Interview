
export enum Speaker {
  Interviewer = 'Interviewer',
  Candidate = 'Candidate',
  System = 'System',
}

export interface TranscriptEntry {
  speaker: Speaker;
  text: string;
}
