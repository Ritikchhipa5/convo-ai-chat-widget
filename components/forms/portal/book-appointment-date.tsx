import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPOINTMENT_TABLE_SLOTS } from "@/constants/timeslots";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  date: Date | undefined;
  bookings?:
    | {
        slot: string;
        date: Date;
      }[]
    | undefined;
  currentSlot?: string;
  register: UseFormRegister<FieldValues>;

  onSlot: (slot: string) => void;
  loading: boolean;

  onPrev: () => void;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

function BookAppointmentDate({
  date,
  bookings,
  currentSlot,
  register,
  loading,
  onSlot,
  onPrev,
  onBooking,
}: Props) {
  return (
    <div className="space-y-8 w-full">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Book Appointment</h2>
        <p className="text-sm text-muted-foreground">
          Select a date and available time slot
        </p>
      </div>

      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onBooking}
          className="rounded-md"
        />
      </div>
      {/* Slots */}
      <div className="space-y-3 flex-1">
        <h3 className="text-sm font-medium">Available Slots</h3>

        <div className="grid grid-cols-2  gap-2">
          {APPOINTMENT_TABLE_SLOTS.map((slot, key) => {
            const isBooked =
              bookings?.some(
                (booking) => booking.date === date && booking.slot === slot.slot
              ) ?? false;

            const isSelected = currentSlot === slot.slot;

            return (
              <Label
                key={key}
                htmlFor={`slot-${key}`}
                className="relative w-full"
              >
                <Card
                  onClick={() => !isBooked && onSlot(slot.slot)}
                  className={cn(
                    "flex items-center rounded-md shadow-none  w-full justify-center py-4 text-sm font-medium transition-all",
                    "border cursor-pointer select-none",
                    isSelected && "border-amber-500 bg-amber-500 text-white",
                    !isSelected && "hover:border-amber-400",
                    isBooked && "opacity-50 cursor-not-allowed "
                  )}
                >
                  <Input
                    type="radio"
                    value={slot.slot}
                    className="hidden"
                    id={`slot-${key}`}
                    {...register("slot")}
                    disabled={isBooked}
                  />

                  {slot.slot}

                  {isBooked && (
                    <span className="absolute top-1 right-2 text-xs text-muted-foreground">
                      Booked
                    </span>
                  )}
                </Card>
              </Label>
            );
          })}
        </div>

        <div className="gap-2 flex flex-col">
          <Button className="w-full" variant="outline" onClick={onPrev}>
            Edit Question?
          </Button>
          <Button className="w-full" type="submit">
            <Loader loading={loading}>Book Now</Loader>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookAppointmentDate;
