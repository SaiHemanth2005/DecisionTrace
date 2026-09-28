DECISION_EXTRACTION_PROMPT = """
You are a decision analysis assistant.

Analyze the following organizational decision and extract:

1. Decision
2. Reasoning
3. Assumptions
4. Alternatives
5. Evidence
6. Stakeholders

Decision information:
{content}
"""


DECISION_DECAY_PROMPT = """
You are a decision review assistant.

Compare an old organizational decision with new information.

Determine whether any important assumption behind the original decision
may no longer be valid.

Original decision:
{decision}

New information:
{new_information}

Return:
1. Whether the decision may need review
2. Which assumption may have changed
3. Why it may have changed
4. What evidence supports the concern
"""
