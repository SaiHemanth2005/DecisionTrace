from hindsight_service import HindsightService

# Create Hindsight service
hindsight = HindsightService()

print("✅ HindsightService connected!")

# Store a new decision
hindsight.store_memory("""
Decision: Use PostgreSQL for the analytics platform.

Reason:
The team expects complex relational queries and growing analytics workloads.

Assumption:
Analytics requirements will increase over time.

Alternative:
MongoDB was considered but rejected because relational queries
are expected to be important.
""")

print("✅ Decision stored!")

print("\n🔎 Asking Hindsight...")

# Recall the decision
memories = hindsight.recall(
    "Why did the team choose PostgreSQL?"
)

print("\n🧠 Hindsight recalled:")

for memory in memories:
    print("-", memory)