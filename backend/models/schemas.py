from pydantic import BaseModel


class DecisionRequest(BaseModel):
    decision: str
    reason: str
    assumptions: list[str]
    alternatives: list[str]
    stakeholders: list[str]


class DecisionResponse(BaseModel):
    message: str
    decision: str


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str


class ReviewRequest(BaseModel):
    new_information: str


class ReviewResponse(BaseModel):
    message: str
    review_required: bool
