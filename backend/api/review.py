from fastapi import APIRouter

from models.schemas import ReviewRequest, ReviewResponse
from services.decay_detector import DecayDetector

router = APIRouter()

decay_detector = DecayDetector()


@router.post("/", response_model=ReviewResponse)
def review_decision(request: ReviewRequest):

    result = decay_detector.check_for_decay(
        request.decision,
        request.new_information
    )

    return ReviewResponse(
        message=result["message"],
        review_required=result["review_required"]
    )
