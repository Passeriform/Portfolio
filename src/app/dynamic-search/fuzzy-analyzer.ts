import { Injectable } from '@angular/core';

export type FuzzyScore = number;

export interface FuzzySegment {
  value: string;
  isMatch: boolean;
}

@Injectable()
export class FuzzyAnalyzer {

  public parseValue(value: string, input: string): FuzzySegment[] {

    const valueLength = value.length;
    const inputLength = input.length;
    let valueIndex = 0;
    let inputIndex = 0;

    const segments: FuzzySegment[] = [];
    let segment: FuzzySegment;

    while ( valueIndex < valueLength ) {
      const valueChar = value.charAt( valueIndex++ ).toLowerCase();
      const inputChar = input.charAt( inputIndex ).toLowerCase();

      if ( valueChar === inputChar ) {
        inputIndex++;

        if ( segment && segment.isMatch ) {
          segment.value += valueChar;
        } else {
          segment = {
            value: valueChar,
            isMatch: true
          };

          segments.push( segment );
        }

        if ( ( inputIndex === inputLength ) && ( valueIndex < valueLength ) ) {
          segments.push({
            value: value.slice( valueIndex ),
            isMatch: false
          });

          break;
        }
      } else {
        if ( segment && ! segment.isMatch ) {
          segment.value += valueChar;
        } else {
          segment = {
            value: valueChar,
            isMatch: false
          };

          segments.push( segment );
        }
      }
    }
    return( segments );
  }


  public scoreValue(value: string, input: string): FuzzyScore {

    const normalizedValue = value.toLowerCase();
    const normalizedInput = input.toLowerCase();

    const valueLength = normalizedValue.length;
    const inputLength = normalizedInput.length;
    let valueIndex = 0;
    let inputIndex = 0;

    let previousIndexMatched = false;
    let score = 0;

    while ( valueIndex < valueLength ) {
      const valueChar = normalizedValue.charAt( valueIndex++ );
      const inputChar = normalizedInput.charAt( inputIndex );

      if ( valueChar === inputChar ) {
        inputIndex++;
        score += ( previousIndexMatched ) ? 3 : 2;
        previousIndexMatched = true;

        if ( inputIndex === inputLength ) {
          return( score -= ( valueLength - valueIndex ) );
        }
      } else {
        score -= 1;
        previousIndexMatched = false;
      }
    }

    return( score );
  }
}
