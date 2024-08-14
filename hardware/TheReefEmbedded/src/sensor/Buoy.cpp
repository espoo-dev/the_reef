#include "sensor/Buoy.h"

SensorBuoy::SensorBuoy(int pin) : _pin(pin) {}

void SensorBuoy::begin()
{
    pinMode(_pin, INPUT_PULLUP);
    digitalWrite(_pin, HIGH);
}

bool SensorBuoy::isActive()
{
    int buoyStatus = digitalRead(_pin);
    Serial.println("Lendo sensor boia: " + String(buoyStatus));
    return buoyStatus == LOW;
}
