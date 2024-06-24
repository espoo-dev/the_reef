#include "LcdManager.h"

#define I2C_ADDR 0x27
#define LCD_COLS 16
#define LCD_ROWS 2

byte degreeChar[8] = {
    B00111,
    B00101,
    B00111,
    B00000,
    B00000,
    B00000,
    B00000,
    B00000
};

LcdManager::LcdManager() : _lcd(LiquidCrystal_I2C(I2C_ADDR, LCD_COLS, LCD_ROWS)) {}

void LcdManager::begin()
{
    Wire.begin();
    _lcd.init();
    _lcd.backlight();
    _lcd.setBacklight(10);
    _lcd.createChar(0, degreeChar);
}

void LcdManager::printTextAtTop(String text)
{
    _lcd.clear();
    _lcd.setCursor(0, 0);
    _lcd.print(text);
}

void LcdManager::printTemperatureAtTop(float temperature)
{
    _lcd.clear();
    _lcd.setCursor(0, 0);
    _lcd.print("Temp:" + String(temperature));
    _lcd.write((byte)0);
    _lcd.print("C");
}

void LcdManager::printTextOnBottom(String text)
{
    _lcd.clear();
    _lcd.setCursor(0, 1);
    _lcd.print(text);
}
