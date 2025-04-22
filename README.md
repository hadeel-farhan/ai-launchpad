# ALIF SENSE
ALiFsense is a web based simulation platform that trains clinicians to safely and effectively collaborate with autonomous AI in diagnostic decision making. It addresses a critical gap: today’s healthcare professionals aren’t taught how to interrogate, override, or govern AI tools—yet these systems are arriving in practice now.

Core Objectives
•	Build AI Literacy via hands on scenarios
•	Calibrate Trust by having users accept or override AI recommendations
•	Teach Ethics & Bias Detection through AuditorAgent challenges
•	Reinforce Explainability with counterfactuals and transparency toggles
•	Simulate Model Drift & Retraining to show how AI degrades and recovers

Key Features
1.	Multi Agent Chain
o	DiagnosticianAgent proposes a diagnosis + confidence
o	ExplainerAgent justifies the reasoning + offers “what if”s
o	AuditorAgent flags bias, drift or safety concerns
o	MentorAgent scores decisions and links back to ALiF competencies

2.	Interactive UI (React.js)
o	Patient Panel (symptoms, labs, images)
o	AI Panel (suggestion, confidence, transparency toggle)
o	Action Buttons (Accept / Override / Flag)
o	Feedback & Score Summary with tokens to retrain the AI

3.	RAG Powered Context
o	Retrieves similar clinical cases (MultiCaRe, Open Patients, MIMIC)
o	Uses ontologies (Human Disease, Symptom) for structured reasoning

4.	Drift & Fatigue Simulation
o	Model accuracy degrades over repeated use or rare cases
o	Users earn retraining tokens to restore AI performance

5.	ALiF Integration
o	Every user action is mapped to an AI Literacy Framework competency
o	Badges and micro credentials (e.g. “Bias Buster,” “Trust Calibrator”)

