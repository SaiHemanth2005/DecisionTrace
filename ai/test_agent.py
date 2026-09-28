from decision_agent import DecisionAgent

agent = DecisionAgent()

print("🧠 Decision Agent ready!")

# Store a decision
agent.save_decision(
    decision="Use PostgreSQL",
    reason="We expect heavy analytics workloads and complex relational queries.",
    assumptions=[
        "Analytics workload will grow",
        "Relational queries will be important"
    ],
    alternatives=[
        "MongoDB"
    ],
    stakeholders=[
        "Engineering Team",
        "Data Team"
    ]
)

print("✅ Decision saved!")

# Ask the agent
print("\n🔎 Asking DecisionTrace...\n")

answer = agent.ask(
    "Why did the team choose PostgreSQL?"
)

print("🤖 DecisionTrace:")
print(answer)