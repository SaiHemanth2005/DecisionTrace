import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("HINDSIGHT_API_KEY")
BASE_URL = os.getenv(
    "HINDSIGHT_BASE_URL",
    "https://api.hindsight.vectorize.io"
)
BANK_ID = os.getenv(
    "HINDSIGHT_BANK_ID",
    "decisiontrace"
)


class HindsightService:

    def __init__(self):
        if not API_KEY:
            raise ValueError("HINDSIGHT_API_KEY is missing from .env")

        self.client = Hindsight(
            base_url=BASE_URL,
            api_key=API_KEY
        )

        self.bank_id = BANK_ID

    def store_memory(self, content):
        """Store a decision or new information in Hindsight."""

        return self.client.retain(
            bank_id=self.bank_id,
            content=content
        )

    def recall(self, question):
        """Search Hindsight for relevant memories."""

        result = self.client.recall(
            bank_id=self.bank_id,
            query=question
        )

        return [memory.text for memory in result.results]

    def reflect(self, question):
        """Ask Hindsight to synthesize information from memory."""

        result = self.client.reflect(
            bank_id=self.bank_id,
            query=question
        )

        return result.text