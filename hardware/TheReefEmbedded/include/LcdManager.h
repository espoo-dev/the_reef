#ifndef LCD_MANAHER_H
#define LCD_MANAHER_H

#include <LiquidCrystal_I2C.h>
#include <Wire.h>

class LcdManager
{
private:
    LiquidCrystal_I2C _lcd;

public:
    LcdManager();
    void begin();
    void printTextAtTop(String text);
    void printTextOnBottom(String text);
};

#endif
