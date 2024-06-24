#include "actuator/WaterPump.h"

ActuatorWaterPump::ActuatorWaterPump(int pin) : _pin(pin) {}

void ActuatorWaterPump::setStatus(bool status)
{
    _status = status;
}

void ActuatorWaterPump::begin()
{
    pinMode(_pin, OUTPUT);
    digitalWrite(_pin, LOW);
}

void ActuatorWaterPump::turnOn()
{
    digitalWrite(_pin, HIGH);
    setStatus(true);
    Serial.println("Ligou a bomba dagua");
}

void ActuatorWaterPump::turnOff()
{
    digitalWrite(_pin, LOW);
    setStatus(false);
    Serial.println("Desligou a dagua");
}

bool ActuatorWaterPump::isWaterPumpOn()
{
    return _status;
}