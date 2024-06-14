#include "sensor/Buoy.h"

SensorBuoy::SensorBuoy(int pin) : _pin(pin)
{
}

void SensorBuoy::begin()
{
    pinMode(_pin, INPUT_PULLDOWN_16);
}

bool SensorBuoy::isWaterLevelAbove()
{
    int buoyStatsu = digitalRead(_pin);
    return buoyStatsu == HIGH;
}
