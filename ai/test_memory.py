import os
import time

from dotenv import load_dotenv
from hindsight_client import Hindsight

# Load .env
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

if not API_KEY:
    raise ValueError("HINDSIGHT_API_KEY is missing from .env")

# Connect to Hindsight
client = Hindsight(
    base_url=BASE_URL,
    api_key=API_KEY
)

print("✅ Connected to Hindsight!")

# Our first DecisionTrace memory
decision = """
Decision: Use PostgreSQL.

Reason:
The engineering team expects heavy analytics workloads.

Assumptions:
- Analytics workload will grow.
- Relational queries will be important.

Alternative considered:
MongoDB was considered but rejected because
the team expected complex relational queries.
"""

print("\n📝 Storing decision...")

client.retain(
    bank_id=BANK_ID,
    content=decision
)

print("✅ Decision stored!")

# Hindsight processes memories asynchronously
time.sleep(5)

# Ask Hindsight to remember
question = "Why did the team choose PostgreSQL?"

print("\n🔎 Searching memory...")

result = client.recall(
    bank_id=BANK_ID,
    query=question
)

print("\n🧠 HINDSIGHT MEMORY RESULTS")
print("--------------------------------")

for memory in result.results:
    print(memory.text)
    print()