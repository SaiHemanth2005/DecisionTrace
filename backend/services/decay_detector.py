from utils.prompts import DECISION_DECAY_PROMPT
from services.hindsight_service import HindsightService


class DecayDetector:

    def __init__(self):
        self.memory = HindsightService()

    def check_for_decay(
        self,
        decision: str,
        new_information: str
    ) -> dict:

        prompt = DECISION_DECAY_PROMPT.format(
            decision=decision,
            new_information=new_information
        )

        # Ask Hindsight to analyze the decision using stored memory
        result = self.memory.reflect(prompt)

        # Hindsight reflect() returns a result object with .text
        analysis = getattr(result, "text", str(result))

        return {
            "review_required": True,
            "message": "Decision decay analysis completed.",
            "decision": decision,
            "new_information": new_information,
            "analysis": analysis
        }