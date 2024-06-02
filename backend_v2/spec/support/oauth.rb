# frozen_string_literal: true

def mock_omni_auth(key, mock)
  config = OmniAuth.config
  allow(config).to receive(:test_mode).and_return true
  allow(config.mock_auth)
    .to receive(:[]).with(key).and_return(mock)
end
