from hindsight_service import HindsightService


class DecisionAgent:

    def __init__(self):
        self.memory = HindsightService()

    def save_decision(
        self,
        decision,
        reason,
        assumptions=None,
        alternatives=None,
        stakeholders=None
    ):
        """Store a structured team decision in Hindsight."""

        content = f"""
        TEAM DECISION

        Decision:
        {decision}

        Reason:
        {reason}

        Assumptions:
        {assumptions or "Not specified"}

        Alternatives Considered:
        {alternatives or "Not specified"}

        Stakeholders:
        {stakeholders or "Not specified"}
        """

        self.memory.store_memory(content)

        return {
            "success": True,
            "message": "Decision stored successfully"
        }

    def ask(self, question):
        """Answer a question using organizational memory."""

        return self.memory.reflect(question)