from decay_detector import DecayDetector

detector = DecayDetector()

print("⚠️ Decision Decay Detector ready!")

# New information arrives
new_information = """
Analytics requirements have decreased significantly.
The product will now handle mostly simple transactional workloads.
The expected growth in analytics workloads is no longer likely.
"""

print("\n📝 Storing new information...")

detector.add_new_information(new_information)

print("✅ New information stored!")

print("\n🔎 Reviewing previous decisions...\n")

result = detector.review_decisions(new_information)

print("🧠 DECISION REVIEW")
print("=" * 60)
print(result)