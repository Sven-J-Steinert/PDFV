# PDFV - PDF Video
A containerformat for PDF Video intending to reduce filesize and keep vector quality for voiceover presentations.

## Specification
Bit Specification
```
│         HEADER          │                  SEQUENCE                    │                     FILES                        │
│                         │          │    0    │    1    │ ... │    n    │                                                  │
│   identifyer  │ version │ filesize │ t0 │ p0 │ t1 │ p1 │ ... │ tn │ pn │ filesize │  .pdf File  │ filesize │  audio File  │
│ 8 │ 8 │ 8 │ 8 │8|8|8|8│8|    32    │ 32 │ 32 │ 32 │ 32 │ ... │ 32 │ 32 │    32    │      x      │    32    │      y       │
  P   D   F   V  - 0 . 1 #  
```
### Sequence
The Sequence holds tabular information at which time which page of the .pdf should be displayed.
Datatype for both values is unsigned_int_32 resulting in datapairs of each 8 Bytes.
In front of the table data the number of pairs is stored again in a unsigned_int_32 value.

Example:
| | time in ms | page number |
| :---: | :---: | :---: |
| 0 | 0  | 0 |
| 1 | 5000  | 1  |

### Document
any pdf file that will be the main viewport

### Audio
The audio file is starts playing at 0 ms and its length defines the length of the PDF Video.
Common audio codecs are supported, opus recommended.

## Reference Implementation
### File creation
### Recorder
### Player
