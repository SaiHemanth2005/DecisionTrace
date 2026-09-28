from fastapi import APIRouter

from models.schemas import ReviewRequest, ReviewResponse

router = APIRouter()


@router.post("/", response_model=ReviewResponse)
def review_decision(request: ReviewRequest):
    return ReviewResponse(
        message=f"Mock review for: {request.new_information}",
        review_required=False
    )
