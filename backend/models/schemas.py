from pydantic import BaseModel


class DecisionRequest(BaseModel):
    content: str


class DecisionResponse(BaseModel):
    message: str
    decision: str


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str


class ReviewRequest(BaseModel):
    decision: str
    new_information: str


class ReviewResponse(BaseModel):
    message: str
    review_required: bool
