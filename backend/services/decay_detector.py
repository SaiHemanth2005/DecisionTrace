from utils.prompts import DECISION_DECAY_PROMPT


class DecayDetector:
    def check_for_decay(
        self,
        decision: str,
        new_information: str
    ) -> dict:

        prompt = DECISION_DECAY_PROMPT.format(
            decision=decision,
            new_information=new_information
        )

        return {
            "review_required": False,
            "message": "Decision decay analysis is ready for AI evaluation.",
            "decision": decision,
            "new_information": new_information,
            "prompt": prompt
        }
