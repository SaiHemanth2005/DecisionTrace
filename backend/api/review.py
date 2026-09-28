from fastapi import APIRouter

from models.schemas import ReviewRequest, ReviewResponse
from ai.decay_detector import DecayDetector

router = APIRouter()

detector = DecayDetector()


@router.post("/", response_model=ReviewResponse)
def review_decision(request: ReviewRequest):

    detector.add_new_information(
        request.new_information
    )

    result = detector.review_decisions(
        request.new_information
    )

    return ReviewResponse(
        message="Decision review completed",
        review_required=True,
        analysis=result
    )
