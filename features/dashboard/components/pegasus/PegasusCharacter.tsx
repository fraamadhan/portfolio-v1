"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Import paths statically, Next.js handles them and returns an object { src: string, height: number, width: number }
import attackEast from "@/assets/gif/attack_east.gif";
import attackWest from "@/assets/gif/attack_west.gif";
import eatStartEast from "@/assets/gif/eat-start_east.gif";
import eatStartWest from "@/assets/gif/eat-start_west.gif";
import eatingEast from "@/assets/gif/eating_east.gif";
import eatingWest from "@/assets/gif/eating_west.gif";
import eatEndEast from "@/assets/gif/eat-end_east.gif";
import eatEndWest from "@/assets/gif/eat-end_west.gif";
import idleEast from "@/assets/gif/idle-shaking-head_east.gif";
import idleWest from "@/assets/gif/idle-shaking-head_west.gif";
import restCycleEast from "@/assets/gif/rest-cycle_east.gif";
import restCycleWest from "@/assets/gif/rest-cycle_west.gif";
import startSleepEast from "@/assets/gif/start-sleep_east.gif";
import startSleepWest from "@/assets/gif/start-sleep_west.gif";
import sleepCycleSouth from "@/assets/gif/sleep-cycle_south.gif";
import wakeUpEast from "@/assets/gif/wake-up_east.gif";
import wakeUpWest from "@/assets/gif/wake-up_west.gif";
import walkRight from "@/assets/gif/walk-right.gif";
import walkLeft from "@/assets/gif/walk-left.gif";

import SpeechBubble from "./SpeechBubble";
import { useTranslation } from "@/hooks/useTranslation";

export type AnimationState = 
  | "idle" 
  | "walking" 
  | "attack" 
  | "eat_start" 
  | "eating" 
  | "eat_end" 
  | "rest" 
  | "start_sleep" 
  | "sleep"
  | "wake_up";

export type Direction = "east" | "west";

interface PegasusCharacterProps {
  stageWidth: number;
  isDarkMode: boolean;
}

const assets = {
  idle: { east: idleEast.src, west: idleWest.src },
  walking: { east: walkRight.src, west: walkLeft.src },
  attack: { east: attackEast.src, west: attackWest.src },
  eat_start: { east: eatStartEast.src, west: eatStartWest.src },
  eating: { east: eatingEast.src, west: eatingWest.src },
  eat_end: { east: eatEndEast.src, west: eatEndWest.src },
  rest: { east: restCycleEast.src, west: restCycleWest.src },
  start_sleep: { east: startSleepEast.src, west: startSleepWest.src },
  sleep: { east: sleepCycleSouth.src, west: sleepCycleSouth.src },
  wake_up: { east: wakeUpEast.src, west: wakeUpWest.src },
};

export default function PegasusCharacter({ stageWidth, isDarkMode }: PegasusCharacterProps) {
  const { t } = useTranslation();
  // Start at a random position within bounds
  const [position, setPosition] = useState(stageWidth > 0 ? stageWidth / 2 : 100);
  const [direction, setDirection] = useState<Direction>("east");
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [speech, setSpeech] = useState<string | null>(null);
  
  const stateRef = useRef(animState);
  const directionRef = useRef(direction);
  const positionRef = useRef(position);
  const speechRef = useRef(speech);
  const lastStateChangeRef = useRef(Date.now());
  const disturbTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync refs
  useEffect(() => { stateRef.current = animState; }, [animState]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { positionRef.current = position; }, [position]);
  useEffect(() => { speechRef.current = speech; }, [speech]);

  const changeState = useCallback((newState: AnimationState, msg?: string | null) => {
    setAnimState(newState);
    lastStateChangeRef.current = Date.now();
    if (msg !== undefined) {
      setSpeech(msg);
    }
  }, []);

  // Handle Dark mode transitions
  useEffect(() => {
    if (isDarkMode) {
      if (!["rest", "start_sleep", "sleep"].includes(stateRef.current)) {
        changeState("rest", t("pegasus.rest") ?? "Time to rest...");
        
        // Sequence: rest (3s) -> start_sleep (2s) -> sleep
        setTimeout(() => {
          if (stateRef.current === "rest") {
            changeState("start_sleep");
            setTimeout(() => {
              if (stateRef.current === "start_sleep") {
                changeState("sleep", t("pegasus.sleep") ?? "zzz...");
              }
            }, 2000);
          }
        }, 3000);
      }
    } else {
      if (["rest", "start_sleep", "sleep"].includes(stateRef.current)) {
        changeState("wake_up", t("pegasus.wake_up") ?? "Good morning!");
        setTimeout(() => {
          if (stateRef.current === "wake_up") {
            changeState("idle", null); // clear speech
          }
        }, 2000);
      }
    }
  }, [isDarkMode, changeState, t]);

  // Main behavior loop
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = stateRef.current;
      const currentDir = directionRef.current;
      const currentPos = positionRef.current;
      const timeSinceChange = Date.now() - lastStateChangeRef.current;

      // Dark mode forces rest/sleep, ignore other autonomous behaviors
      if (isDarkMode && ["rest", "start_sleep", "sleep"].includes(currentState)) {
        const sleepMsg = t("pegasus.sleep") ?? "zzz...";
        const disturbMsg = t("pegasus.sleeping_disturb") ?? "snoore, im sleeping rn, wait until morning";
        if (currentState === "sleep" && speechRef.current !== sleepMsg && speechRef.current !== disturbMsg) {
          setSpeech(sleepMsg);
        }
        return;
      }

      // Handle walking
      if (currentState === "walking") {
        const step = currentDir === "east" ? 2 : -2;
        let newPos = currentPos + step;
        let newDir = currentDir;

        // Boundaries check
        if (newPos > stageWidth - 40) {
          newDir = "west";
          newPos = stageWidth - 40;
          setDirection("west");
        } else if (newPos < 40) {
          newDir = "east";
          newPos = 40;
          setDirection("east");
        }

        setPosition(newPos);

        // Randomly stop walking
        if (timeSinceChange > 3000 && Math.random() < 0.05) {
          changeState("idle", null);
        }
      }

      // Handle idle autonomous decisions
      if (currentState === "idle" && timeSinceChange > 2000) {
        // clear speech if it was saying hello
        const helloMsg = t("pegasus.hello") ?? "Hello, I'm Zephyr!";
        if (speechRef.current === helloMsg && timeSinceChange > 5000) {
          setSpeech(null);
        }

        const rand = Math.random();
        if (rand < 0.02) {
          // Start walking
          setDirection(Math.random() > 0.5 ? "east" : "west");
          changeState("walking", null);
        } else if (rand < 0.03 && !speechRef.current) {
          // Say something
          setSpeech(t("pegasus.hello") ?? "Hello, I'm Zephyr!");
        } else if (rand < 0.04) {
          // Start eating sequence
          changeState("eat_start");
          setTimeout(() => {
            if (stateRef.current === "eat_start") {
              changeState("eating", t("pegasus.eating") ?? "Don't disturb, I'm eating");
              
              // Add grass at Pegasus's mouth position roughly
              setTimeout(() => {
                if (stateRef.current === "eating") {
                  changeState("eat_end", null);
                  setTimeout(() => {
                    if (stateRef.current === "eat_end") {
                      changeState("idle", null);
                    }
                  }, 1500);
                }
              }, 4000);
            }
          }, 1000);
        }
      }
      
      // Clear attack state after animation
      if (currentState === "attack" && timeSinceChange > 1500) {
        changeState("idle", null);
      }

    }, 50);

    return () => clearInterval(interval);
  }, [stageWidth, isDarkMode, changeState, t]);

  // Interaction handlers
  const handleSleepDisturb = () => {
    const disturbMsg = t("pegasus.sleeping_disturb") ?? "snoore, im sleeping rn, wait until morning";
    setSpeech(disturbMsg);
    
    if (disturbTimeoutRef.current) {
      clearTimeout(disturbTimeoutRef.current);
    }
    
    disturbTimeoutRef.current = setTimeout(() => {
      if (stateRef.current === "sleep") {
        setSpeech(t("pegasus.sleep") ?? "zzz...");
      } else if (["rest", "start_sleep"].includes(stateRef.current)) {
        setSpeech(null);
      }
    }, 4000); // Increased to 4 seconds for better readability
  };

  const handleHover = () => {
    if (isDarkMode && ["rest", "start_sleep", "sleep"].includes(stateRef.current)) {
      handleSleepDisturb();
      return;
    }
    
    if (stateRef.current !== "idle") {
      changeState("idle", null);
    }
  };

  const handleClick = () => {
    if (isDarkMode && ["sleep", "rest", "start_sleep"].includes(stateRef.current)) {
      handleSleepDisturb();
      return;
    }
    changeState("attack", t("pegasus.attack") ?? "Fight me!");
  };

  const currentSrc = assets[animState][direction];

  return (
    <>
      <div 
        className="absolute z-20 select-none group"
        style={{ 
          bottom: "-12px",
          left: `${position}px`, 
          transform: "translateX(-50%)",
          transition: animState === "walking" ? "none" : "left 0.2s ease-out"
        }}
        onMouseEnter={handleHover}
        onClick={handleClick}
      >
        <SpeechBubble message={speech} position={position} stageWidth={stageWidth} />
        
        <div className="relative w-20 h-20 cursor-pointer transition-transform group-hover:scale-105 group-active:scale-95 drop-shadow-xl flex items-end justify-center">
          {/* Use standard img tag to prevent Next.js from optimizing away the webp animation */}
          <img 
            src={currentSrc} 
            alt={`Pegasus ${animState}`} 
            className="object-contain max-h-full max-w-full"
            loading="eager"
            width={80}
            height={80}
          />
        </div>
      </div>
    </>
  );
}
