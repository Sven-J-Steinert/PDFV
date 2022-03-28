# PDFV - PDF Video
A containerformat for PDF Video intending to reduce filesize and keep vector quality for voiceover presentations.

## Specification
Bit Specification
```
│         HEADER          │                      SEQUENCE                       │                     FILES                        │
│                         │                 │    0    │    1    │ ... │    n    │                                                  │
│   identifyer  │ version │ number of pairs │ t0 │ p0 │ t1 │ p1 │ ... │ tn │ pn │ filesize │  .pdf File  │ filesize │  .opus File  │
│ 8 │ 8 │ 8 │ 8 │    8    │       32        │ 32 │ 32 │ 32 │ 32 │ ... │ 32 │ 32 │    32    │      x      │    32    │      y       │
  P   D   F   V     0.1    
                   25.5 (max)
```

the Sequence holds tabular information at which time which page of the .pdf should be displayed

Example:
| | time in ms | page number |
| :---: | :---: | :---: |
| 0 | 0  | 0 |
| 1 | 5000  | 1  |

The audio file is starts playing at 0 ms and its length defines the length of the PDF Video

## Reference Implementation
### File creation
### Recorder
### Player
