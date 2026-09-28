from utils.prompts import DECISION_EXTRACTION_PROMPT


class DecisionAgent:
    def process_decision(self, content: str) -> dict:

        prompt = DECISION_EXTRACTION_PROMPT.format(
            content=content
        )

        return {
            "decision": content,
            "reasoning": "AI reasoning extraction will use the generated prompt.",
            "assumptions": [],
            "alternatives": [],
            "evidence": [],
            "stakeholders": [],
            "prompt": prompt
        }
