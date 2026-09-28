from hindsight_service import HindsightService


class DecayDetector:

    def __init__(self):
        self.memory = HindsightService()

    def add_new_information(self, information):
        """Store new information that may affect previous decisions."""

        content = f"""
        NEW INFORMATION

        {information}
        """

        self.memory.store_memory(content)

        return {
            "success": True,
            "message": "New information stored successfully"
        }

    def review_decisions(self, information):
        """
        Check whether new information conflicts with
        assumptions behind previous decisions.
        """

        question = f"""
        Review the team's previous decisions in memory.

        New information:
        {information}

        Identify any previous decisions whose assumptions,
        reasoning, or evidence may no longer hold.

        For each potentially affected decision, provide:

        1. Decision
        2. Original assumption
        3. New information
        4. Why they may conflict
        5. Recommended human review

        Do not automatically change or reject any decision.
        Only identify potential decision decay.
        """

        return self.memory.reflect(question)