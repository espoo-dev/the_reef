# frozen_string_literal: true

require "rails_helper"

RSpec.describe HardJob, type: :job do
  context "performs the job"
  it "Basic" do
    expect { described_class.perform_async }.to enqueue_sidekiq_job
  end

  it "A specific job class" do
    expect { described_class.perform_async }.to enqueue_sidekiq_job(described_class)
  end

  it "with specific arguments" do
    expect { described_class.perform_async "HardJob!" }.to enqueue_sidekiq_job.with("HardJob!")
  end

  it "On a specific queue" do
    expect { described_class.set(queue: "high").perform_async }.to enqueue_sidekiq_job.on("high")
  end

  it "At a specific datetime" do
    specific_time = 1.hour.from_now

    expect { described_class.perform_at(specific_time) }.to enqueue_sidekiq_job.at(specific_time)
  end

  it "In a specific interval (be mindful of freezing or managing time here)" do
    freeze_time do
      expect { described_class.perform_in(1.hour) }.to enqueue_sidekiq_job.in(1.hour)
    end
  end

  it "Combine and chain them as desired" do
    specific_time = 1.hour.from_now

    expect { described_class.perform_at(specific_time, "HardJob!") }.to(
      enqueue_sidekiq_job(described_class)
      .with("HardJob!")
      .on("default")
      .at(specific_time)
    )
  end

  describe "#perform" do
    it "logs args from parameters" do
      args = { message: "something nice" }
      expect(Rails.logger).to receive(:debug).with([args])
      described_class.new.perform(args)
    end
  end
end
