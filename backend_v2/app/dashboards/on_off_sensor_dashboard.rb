# frozen_string_literal: true

require "administrate/base_dashboard"

class OnOffSensorDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    name: Field::String,
    description: Field::String,
    sensor_type: Field::String,
    icon_url: Field::String,
    priority: Field::Number,
    aquarium: Field::BelongsTo,
    on_off_actuator: Field::HasOne,
    on_off_values: Field::HasMany,
    publish_data_to_server_interval: Field::DateTime,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    name
    description
    sensor_type
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    name
    sensor_type
    description
    icon_url
    priority
    publish_data_to_server_interval
    aquarium
    on_off_actuator
    on_off_values
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    aquarium
    description
    name
    icon_url
    sensor_type
    publish_data_to_server_interval
    priority
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how on off sensors are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(on_off_sensor)
    on_off_sensor.name
  end
end
