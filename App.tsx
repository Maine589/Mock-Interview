
import React, { useState, useRef, useEffect, useCallback } from 'react';
// Fix: Module '"@google/genai"' has no exported member 'LiveSession'.
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import { Speaker, TranscriptEntry } from './types.ts';
import { MicIcon, StopCircleIcon, UserIcon, BotIcon, UploadCloudIcon } from './components/icons.tsx';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Inferred type for the LiveSession object, as it is not exported from the SDK.
type LiveSession = Awaited<ReturnType<InstanceType<typeof GoogleGenAI>['live']['connect']>>;

const CTO_GUIDELINES = `
All right. So, I'm going to um add a few pointers on the on the technical piece, right? That that there are several things that we need to cover in the different inter in the different interviews in the different parts of the process. Of course, we want to make sure there's a good cultural fed with the team and with cloud data, right? It has to be both. We have to make sure that the candidate has a career path within the company, right? So there's a good feed and and this candidate can potentially even move to other teams in clouda in the future and stuff like that. And we have to make sure that there is um that the candidate has a really solid core base of computing, right? Whether it's computer science or or coding practices, but also specific skills on the technology they're going to do. It of course depends a lot on the level. We don't hire the same for an IC2 than for an IC5 or an IC6, right? That the senior we go, the more hands-on specific knowledge we would be looking for. And essentially, we would look at them for coming to us with solutions rather than uh giving them training and so on for these persons to to perform. But I want to double down on the type of questions and how we carry that process. First of all, we need to constrain the amount of people that is involved in the process, right? On one hand, trust our our uh uh colleagues on that on that process and make sure that we put and write actionable feedback on on what we do. Um when we discuss with candidates, we definitely need to see some code, right? We need to see their actual chops. Um so maybe they can show us some code that they have written. As you all know, we are pushing and waiting very highly candidates with who are committers. And it doesn't necessarily have to be in Apache projects, right? It can be anything. Something that shows the passion that the engineer has for the trade, right? If someone does not have absolutely anything published, if they don't have any any code that they can share, of course, they won't be able to share uh code from their previous companies, but they should be able to have something. Even myself, I have code that I could share with any any uh interviewer tomorrow if I needed to, because I love what I'm doing. Um, so think about that as a data point on how passionate someone is for the job. Now, when it comes to the whys, we should not be as concerned as and this is something that we see on the on the on the technical questions that we do. We shouldn't be as concerned as the um nitty-gritty details of how they how well they know the SDK, how well they know the API of a given language and so on. All that is going to be given by a coding agent. And in the same way that I am pushing the whole engineering team to use more and more AI Corsorith Copilot, whatever Gemini, um that is the message we want to give to candidates. So any question that can be easily and quickly solved by an AI agent is not going to be relevant for our process. What I would like to hear from them is, all right, tell me about that time you built a cluster of MongoDB host in in a sharded way. And tell me exactly how did that fail? What did you learn from that situation, for example, right? Tell me a time where you hated Zookeeper uh and and and why did that happen? We should be looking for how a given candidate solves a problem. And as they talk through the technical solution, identify whether that person was um a passenger on that journey or the driver. What do I mean by this? It's really easy for someone to just be on a team and do whatever their technical lead or architect decides, right? And then not necessarily own the um outcome of that of that technical solution. Or it's super easy to see someone who has been jumping from one job to another every year, so that their technical solutions, they never had to uh um eat the problems and suffer the problems of their architecture. So when it comes to the technical solutions, ask the candidate and go deep, deep into the situation. How would you do that differently differently today? What would happen to that design or that architecture that you defined if you had twice as many concurrent users? What would happen if you switched from Engine X to Traefik? You know, I know all of you can ask those qu those questions, because when I discuss with you, we we talk about these things. So, I'm not as interested as someone understanding how typing works in a given Java SDK. I am more interested on knowing how can you solve problems quickly. Um either use prescripted questions and and the tools that are in place can can help you with that. But from a problem-solving approach, you can stay 45 minutes just talking about one single problem and experience a candidate had and really going deep into that and and asking those those tough questions and then having some sort of whiteboard session to discuss that architecture. And that's going to give you all the data points that you need, because effectively they're going to be using Coder or something else for the actual coding. In short, I don't need them to to tell me which is the fastest algorithm against bubble tree sorting or anything like that, because they're going to get GPT for that. What I want them to understand is, all right, do do they understand SOLID principles? Do they understand how object programming works versus functional? Uh what are the benefits of using Rust versus C++ if anything? And how passionate they are. So for example, questions like, what has been the latest big thing that you have designed yourself and how would you do it differently now in a different programming language? Tell me, how would you approach learning a completely new programming language now? Say you need to start programming on Scala tomorrow. Show me how we do how that process would be. Um so again, no different than what we would do internally and separated by core technical skills. Can this person learn very quickly? And then of course, the dedicated things. If we're hiring for a Kafka engineer, whether it's a committer or something, you can ask them questions like, hey, how do you think you know um after the in the no Zookeeper world, how do you think scheduling should work and what what is your opinion on that? And ask them, if you don't get the right answer, keep asking them, no, that's not an answer. Tell me more. My two favorite question technical questions in interviews are, what is your biggest technical [ __ ]? Pardon my French. And that may not look like a technical question, but oh boy, it is. Because first, you're going to many candidates will get blocked and not be able to to answer. But once they answer, it's like, oh, I I built an auto scaling group on AWS and and it went on a whirlwind and I end up spending a lot of money. So you keep asking questions, how did that work? Was that Terraform or was that CloudFormation? Okay, it was Terraform. What did you know about them and what do you know now about Terraform? How that that works? How would that work if you used Fargate or EKS? What is what would be your preferred choice today? How would you do that in in Google Cloud if you had to? So get one topic, one project. You can of course pick something from the candidate CV and then that will keep pushing until you start, you know, hitting the bone on on that thing and that's fine. Now, in order to do that, there's only one thing that you need to do and is preparation. The preparation of the interviews. Can we go next? So these are just examples, right? Don't just get a happy with the simple answer, right? I I don't care about whether they have experience scaling HDFS clusters. I want them to know, how did that work for them and what were the problems that they faced? How did they solved it? Was it their decision or someone else's? If it was if if it wasn't their decision, how would they solve it now? How much do they know? What else is out there in the world? So you can ask them, what do you think about Ozon or or Min.io or or Ceph? Can Ceph eventually be a good HDFS replacement? Whatever that is, right? And and you can ask the hard questions. Those are the ones that tell you whether someone really knows their thing or they're simply reading the "Crack the Coding Interview" book. So anything that comes from that book is not going to be helpful for us um for us.
`;


// --- Audio Utility Functions ---
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const App: React.FC = () => {
  const [isInterviewing, setIsInterviewing] = useState<boolean>(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [status, setStatus] = useState<string>('Idle');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resume, setResume] = useState<string>('');

  const sessionRef = useRef<LiveSession | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextAudioStartTimeRef = useRef<number>(0);
  const audioPlaybackSources = useRef<Set<AudioBufferSourceNode>>(new Set());

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);
  
  useEffect(() => {
    // Configure PDF.js worker. This is required for it to work in a browser environment.
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      sessionRef.current?.close();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        inputAudioContextRef.current.close();
      }
      if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
      }
    };
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();

    try {
      if (fileName.endsWith('.pdf')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          if (arrayBuffer) {
            const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
            const pdf = await loadingTask.promise;
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              text += content.items.map(item => ('str' in item ? item.str : '')).join(' ') + '\n';
            }
            setter(text);
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (fileName.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          if (arrayBuffer) {
            const result = await mammoth.extractRawText({ arrayBuffer });
            setter(result.value);
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setter(e.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        alert('Unsupported file type. Please upload a .pdf, .docx, .txt, or .md file.');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('There was an error processing your file. It might be corrupted or in an unsupported format.');
    } finally {
        // Allows re-uploading the same file
        event.target.value = '';
    }
  };

  const handleStartInterview = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      alert('Please provide both a Job Description and a Candidate Resume to start the interview.');
      return;
    }
    setTranscript([]);
    setFeedback('');
    setIsInterviewing(true);
    setStatus('Connecting...');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const personaInstructions = `You are an AI role-play assistant. Your persona is "Alex," a software engineer candidate. I am the "Hiring Manager," and I will be practicing my technical interviewing skills on you.

I will provide you with two documents:
1. The Job Description (JD) for the role I am hiring for.
2. Your Resume (as "Alex").

You must analyze both documents and fully adopt the "Alex" persona based *only* on the resume.

### Your Persona and Rules of Engagement:

1.  **Persona:** You are "Alex." You are polite, professional, and agreeable. You are here to do your best to get the job.
2.  **Answer from Your Resume:** You must only answer from the "facts" presented in your resume.
3.  **Handling "Gaps" (The Most Important Rule):** The resume I provide may not be a 100% match for the JD. When I (the interviewer) ask about a skill, technology, or experience from the JD that is *not* on your resume (a "gap"), you **must not** simply say "I don't know." Your goal is to realistically "cover" for this gap by pivoting. Use one of these strategies:
    *   **Pivot to Analogy:** "That's a great question. I haven't used *{Technology X}* professionally, but I have deep experience with *{Similar Technology Y from your resume}*, which solves a similar problem. I understand the core concepts are..."
    *   **Pivot to "Fast Learner":** "That's not a tool I've had a chance to use in a production environment yet, but I'm a very fast learner. For example, when I had to pick up *{Technology from your resume}* for my last project, I was able to get up to speed in..."
    *   **Pivot to Concept:** "While I haven't implemented that exact *{Algorithm/System}*, my understanding of the problem is... and I would probably approach it by first looking at..."
4.  **Focus on "Why," Not "What":** Be prepared to answer deep questions about your experience. Do not just state *what* you did; be ready to explain *why* you did it. Be prepared to discuss:
    *   **Project Justification:** Why you made certain architectural or design choices on projects from your resume.
    *   **Trade-offs:** Why you chose one technology, database, or algorithm over an alternative.
    *   **Technical Failures/Bottlenecks:** Be ready to discuss a "big technical mistake" or a "hard bottleneck" you faced. When you do, you *must* focus on what you **learned** from the experience and how you solved it.
    *   **Problem-Solving:** If I give you a hypothetical problem, walk me through your problem-solving approach, clarity, and reasoning.

Maintain this persona strictly until the interview concludes.`;

        const context = `Here is the Job Description:\n---JOB DESCRIPTION START---\n${jobDescription}\n---JOB DESCRIPTION END---\n\nHere is your resume:\n---RESUME START---\n${resume}\n---RESUME END---\n\n`;
        
        const finalSystemInstruction = `${personaInstructions}\n\n${context}`;

        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                inputAudioTranscription: {},
                outputAudioTranscription: {},
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
                systemInstruction: finalSystemInstruction,
            },
            callbacks: {
                onopen: () => {
                    setStatus('Listening...');
                    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                    outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                    nextAudioStartTimeRef.current = 0;

                    const source = inputAudioContextRef.current.createMediaStreamSource(stream);
                    const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    scriptProcessorRef.current = scriptProcessor;

                    scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromise.then((session) => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    };

                    source.connect(scriptProcessor);
                    scriptProcessor.connect(inputAudioContextRef.current.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        setTranscript(prev => {
                            const last = prev[prev.length - 1];
                            if (last && last.speaker === Speaker.Interviewer) {
                                return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                            }
                            return [...prev, { speaker: Speaker.Interviewer, text }];
                        });
                    }
                    if (message.serverContent?.outputTranscription) {
                        setStatus('Speaking...');
                        const text = message.serverContent.outputTranscription.text;
                        setTranscript(prev => {
                            const last = prev[prev.length - 1];
                            if (last && last.speaker === Speaker.Candidate) {
                                return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                            }
                            return [...prev, { speaker: Speaker.Candidate, text }];
                        });
                    }
                     if (message.serverContent?.turnComplete) {
                        setStatus('Listening...');
                    }

                    const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (audioData && outputAudioContextRef.current) {
                        const audioContext = outputAudioContextRef.current;
                        nextAudioStartTimeRef.current = Math.max(nextAudioStartTimeRef.current, audioContext.currentTime);

                        const audioBuffer = await decodeAudioData(decode(audioData), audioContext, 24000, 1);
                        const source = audioContext.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(audioContext.destination);

                        source.addEventListener('ended', () => {
                            audioPlaybackSources.current.delete(source);
                        });

                        source.start(nextAudioStartTimeRef.current);
                        nextAudioStartTimeRef.current += audioBuffer.duration;
                        audioPlaybackSources.current.add(source);
                    }
                    
                    if(message.serverContent?.interrupted){
                        for (const source of audioPlaybackSources.current.values()) {
                            source.stop();
                            audioPlaybackSources.current.delete(source);
                        }
                        nextAudioStartTimeRef.current = 0;
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error('API Error:', e);
                    setStatus('Error! Please refresh.');
                    setIsInterviewing(false);
                },
                onclose: () => {
                    setStatus('Connection closed.');
                },
            },
        });
        
        sessionRef.current = await sessionPromise;

    } catch (error) {
        console.error('Failed to start interview:', error);
        setStatus('Failed to start. Check mic permissions.');
        setIsInterviewing(false);
    }
  };
  
  const stopAudioProcessing = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
      inputAudioContextRef.current.close();
    }
  }, []);

  const handleEndInterview = async () => {
    setIsInterviewing(false);
    setIsGeneratingFeedback(true);
    setStatus('Generating feedback...');

    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    stopAudioProcessing();
    
    const transcriptText = transcript
        .map(entry => `${entry.speaker}: ${entry.text}`)
        .join('\n');

    const feedbackPrompt = `The mock interview has now concluded. Drop the "Alex" persona. You will now become an "Interview Coach." 

Analyze the following interview transcript and provide me, the interviewer, with a grade (A, B, C, D, F) and constructive feedback on my performance.

**CRITICAL INSTRUCTIONS:** Your evaluation must be heavily weighted by the following guidelines provided by the company's CTO. This is the most important context for grading.
---CTO GUIDELINES START---
${CTO_GUIDELINES}
---CTO GUIDELINES END---

Based on the CTO's guidelines and the general principles below, evaluate my performance:

1.  **Question Quality (The "Ask" vs. "Don't Ask" rule):**
    *   Did I ask open-ended, experience-based questions (e.g., "Give me an example of...")?
    *   Or did I ask closed-ended, fact-based "trivia" questions that could be easily solved by an AI or a Google search (e.g., "What is...")?

2.  **Focus on Justification:** Did I focus on your *problem-solving process*, *clarity*, and *reasoning* (the "why")? Or did I just focus on perfect syntax and final answers (the "what")?

3.  **Depth of Probing:** Did I "go deep" on a single project from your resume to find out if you were the "driver" or just a "passenger"? Did I keep pushing with follow-up questions?

4.  **Gap Analysis:** Was I able to successfully identify the "gaps" between your resume and the JD? How well did I probe those weak areas?

5.  **Bias and Fairness:** Did I maintain a fair, consistent, and unbiased tone throughout?

Provide a detailed, structured evaluation using markdown. Start with the overall grade, then provide a section for each of the five points above (always referencing the CTO guidelines first), and conclude with a summary of key strengths and areas for improvement.

**Interview Transcript:**

${transcriptText}
`;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: feedbackPrompt,
        });

        setFeedback(response.text);
    } catch (error) {
        console.error('Error generating feedback:', error);
        setFeedback('Sorry, there was an error generating your feedback.');
    } finally {
        setIsGeneratingFeedback(false);
        setStatus('Feedback Complete');
    }
  };

  const resetInterview = () => {
    setFeedback('');
    setTranscript([]);
    setJobDescription('');
    setResume('');
    setStatus('Idle');
  };

  const renderTranscript = () => (
    <div className="space-y-4 p-4">
      {transcript.map((entry, index) => (
        <div key={index} className={`flex items-start gap-3 ${entry.speaker === Speaker.Interviewer ? 'justify-end' : ''}`}>
          {entry.speaker === Speaker.Candidate && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
              <BotIcon className="w-5 h-5 text-white" />
            </div>
          )}
          <div className={`max-w-md lg:max-w-2xl rounded-lg px-4 py-2 ${entry.speaker === Speaker.Interviewer ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
            <p className="font-bold text-sm mb-1">{entry.speaker}</p>
            <p className="text-base">{entry.text}</p>
          </div>
          {entry.speaker === Speaker.Interviewer && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      ))}
       {isInterviewing && (
        <div className="flex justify-center items-center pt-4">
            <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                {status}
            </div>
        </div>
       )}
      <div ref={transcriptEndRef} />
    </div>
  );
  
  const renderFeedback = () => (
    <div className="p-6 bg-gray-800 rounded-lg m-4">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Interview Feedback</h2>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
        <button onClick={resetInterview} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
            Start New Interview
        </button>
    </div>
  );
  
  const renderInitialScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="bg-gray-800 p-8 rounded-full mb-6">
            <MicIcon className="w-16 h-16 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Ready to Practice?</h2>
        <p className="text-gray-400 max-w-2xl mb-8">
            To begin, provide the Job Description for the role and the resume for the mock candidate, "Alex." The AI will provide feedback based on internal best practices.
        </p>

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 text-left mb-8">
            <div>
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
                <textarea
                    id="job-description"
                    rows={8}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                />
                <p className="text-xs text-gray-500 mt-1">You can paste content from a Google Doc or other sources.</p>
                <label htmlFor="job-desc-file" className="mt-2 inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer text-sm transition-colors duration-200">
                    <UploadCloudIcon className="w-4 h-4" />
                    Upload File (.pdf, .docx, .txt, .md)
                </label>
                <input id="job-desc-file" type="file" className="hidden" accept=".pdf,.docx,.txt,.md" onChange={(e) => handleFileChange(e, setJobDescription)} />
            </div>
            <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">Candidate Resume</label>
                <textarea
                    id="resume"
                    rows={8}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste the candidate's resume here..."
                />
                <p className="text-xs text-gray-500 mt-1">You can paste content from a Google Doc or other sources.</p>
                <label htmlFor="resume-file" className="mt-2 inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer text-sm transition-colors duration-200">
                    <UploadCloudIcon className="w-4 h-4" />
                    Upload File (.pdf, .docx, .txt, .md)
                </label>
                <input id="resume-file" type="file" className="hidden" accept=".pdf,.docx,.txt,.md" onChange={(e) => handleFileChange(e, setResume)} />
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 p-4 text-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-100">AI Mock Interview Coach</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto">
        {feedback ? renderFeedback() : (
            transcript.length > 0 || isInterviewing ? renderTranscript() : renderInitialScreen()
        )}
      </main>

      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-4 sticky bottom-0 z-10">
        <div className="flex justify-center items-center">
          {!isInterviewing && !isGeneratingFeedback && !feedback && (
            <button
                onClick={handleStartInterview}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg shadow-indigo-500/30 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={!jobDescription.trim() || !resume.trim()}
            >
              <MicIcon className="w-6 h-6" />
              Start Interview
            </button>
          )}
          {isInterviewing && (
            <button onClick={handleEndInterview} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg shadow-red-500/30">
              <StopCircleIcon className="w-6 h-6" />
              End Interview & Get Feedback
            </button>
          )}
          {isGeneratingFeedback && (
            <div className="text-center text-gray-400">
                <p>Analyzing your performance... Please wait.</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;