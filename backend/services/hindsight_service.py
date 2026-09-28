from hindsight_client import Hindsight

from config import (
    HINDSIGHT_BASE_URL,
    HINDSIGHT_API_KEY,
    HINDSIGHT_BANK_ID,
)


class HindsightService:
    def __init__(self):
        client_config = {
            "base_url": HINDSIGHT_BASE_URL
        }

        if HINDSIGHT_API_KEY:
            client_config["api_key"] = HINDSIGHT_API_KEY

        self.client = Hindsight(**client_config)

    def store_decision(self, content: str):
        return self.client.retain(
            bank_id=HINDSIGHT_BANK_ID,
            content=content,
            context="DecisionTrace decision"
        )

    def recall(self, query: str):
        return self.client.recall(
            bank_id=HINDSIGHT_BANK_ID,
            query=query
        )

    def reflect(self, query: str):
        return self.client.reflect(
            bank_id=HINDSIGHT_BANK_ID,
            query=query
        )
