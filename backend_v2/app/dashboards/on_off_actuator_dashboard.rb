# frozen_string_literal: true

require "administrate/base_dashboard"

class OnOffActuatorDashboard < Administrate::BaseDashboard
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
    actuator_type: Field::String,
    icon_url: Field::String,
    embedded_actuator_pin: Field::Number,
    priority: Field::Number,
    publish_data_to_server_interval: Field::DateTime,
    aquarium: Field::BelongsTo,
    on_off_values: Field::HasMany,
    on_off_sensor: Field::BelongsTo,
    range_sensor: Field::BelongsTo,
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
    actuator_type
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    aquarium
    description
    actuator_type
    icon_url
    embedded_actuator_pin
    name
    priority
    on_off_sensor
    on_off_values
    publish_data_to_server_interval
    range_sensor
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    name
    description
    actuator_type
    icon_url
    embedded_actuator_pin
    publish_data_to_server_interval
    aquarium
    on_off_sensor
    on_off_values
    range_sensor
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

  # Overwrite this method to customize how on off actuators are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(on_off_actuator)
    on_off_actuator.name
  end
end
