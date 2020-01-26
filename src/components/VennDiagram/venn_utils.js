import * as d3 from 'd3';

const NOT_SHADED = '0';
const MAYBE_SHADED = '1';
const SHADED = '2';

const TWO_SET_CIRCLES_ORIENTATION = Object.freeze({
  VERTICAL: 0,
  HORIZONTAL: 1,
});

const twoSetHorizontalCircles = [
  {
    cX: 90,
    cY: 92,
    id: 'circle1',
  },
  {
    cX: 200,
    cY: 92,
    id: 'circle2',
  },
];

const twoSetVerticalCircles = [
  {
    cX: 90,
    cY: 92,
    id: 'circle1',
  },
  {
    cX: 90,
    cY: 200,
    id: 'circle2',
  },
];

const twoSetVerticalCircleVennDiagramPaths = [
  {
    name: '(A)',
    path: 'M 81.00,13.42 C 71.34,14.88 65.02,16.05 56.00,20.32 29.40,32.93 11.14,60.45 11.00,90.00 10.93,104.75 13.48,118.12 21.01,131.00 22.55,133.63 26.87,140.90 29.30,142.26 32.67,144.14 36.53,139.62 39.00,137.61 47.29,130.88 54.90,126.70 65.00,123.33 84.83,116.73 106.18,117.88 125.00,127.27 130.73,130.13 136.03,133.58 141.00,137.61 142.82,139.09 146.59,142.82 148.91,142.80 152.17,142.79 156.24,135.56 157.80,133.00 164.65,121.71 168.84,108.27 169.00,95.00 169.16,80.87 167.12,68.76 160.73,56.00 146.06,26.72 113.38,9.47 81.00,13.42 Z',
  },
  {
    name: '(A&B)',
    path: 'M 81.00,121.42 C 66.06,123.68 56.59,126.56 44.00,135.44 41.23,137.39 34.20,142.38 34.20,146.00 34.20,149.79 42.05,155.24 45.00,157.25 57.32,165.64 72.01,170.82 87.00,171.00 104.91,171.21 118.88,167.86 134.00,157.92 137.14,155.86 145.80,149.96 145.80,146.00 145.80,141.86 136.32,135.55 133.00,133.44 117.58,123.62 99.22,119.20 81.00,121.42 Z',
  },
  {
    name: '(B)',
    path: 'M 30.17,149.34 C 25.98,152.03 23.50,156.75 21.01,161.00 13.28,174.23 10.83,187.87 11.00,203.00 11.48,243.43 46.57,278.52 87.00,279.00 96.99,279.11 106.48,278.19 116.00,274.92 146.17,264.58 168.62,235.14 169.00,203.00 169.17,188.56 166.98,175.93 160.22,163.00 158.69,160.08 153.89,152.28 151.54,150.37 147.85,147.38 144.88,151.23 142.00,153.54 135.41,158.83 127.92,163.90 120.00,166.94 98.70,175.09 76.80,175.14 56.00,165.22 50.42,162.55 44.83,159.05 40.00,155.19 36.62,152.49 34.58,149.53 30.17,149.34 Z',
  },
];

const twoSetHorizontalCircleVennDiagramPaths = [
  {
    name: '(A)',
    path: 'M 81.00,13.42 C 74.80,14.36 70.05,15.00 64.00,17.08 41.41,24.83 22.83,43.41 15.08,66.00 -1.85,115.37 33.79,170.37 87.00,171.00 102.80,171.18 116.26,168.58 130.00,160.40 132.71,158.78 139.87,154.42 141.26,151.83 143.36,147.91 135.35,140.37 133.09,137.00 124.72,124.50 121.06,112.80 119.28,98.00 117.66,84.47 122.28,65.83 128.86,54.00 131.83,48.67 133.80,45.76 137.61,41.00 138.97,39.30 141.83,36.27 141.81,34.04 141.76,30.20 132.13,24.84 129.00,23.01 115.08,14.88 96.98,11.47 81.00,13.42 Z',
  },
  {
    name: '(A&B)',
    path: 'M 144.00,37.54 C 138.09,40.63 134.36,47.27 131.01,53.00 119.86,72.09 117.89,98.25 125.44,119.00 128.25,126.75 132.54,134.53 137.67,141.00 139.49,143.30 142.61,147.52 146.00,146.66 150.29,145.57 157.30,133.99 159.57,130.00 171.38,109.25 171.88,81.76 162.57,60.00 160.22,54.50 152.13,40.26 146.99,37.54 145.03,36.78 144.78,37.37 144.00,37.54 Z',
  },
  {
    name: '(B)',
    path: 'M 191.00,13.42 C 177.44,15.47 169.87,17.45 158.00,24.81 155.53,26.35 149.10,30.32 148.34,33.09 147.43,36.38 155.54,44.85 157.56,48.00 165.58,60.45 168.60,70.51 170.58,85.00 172.48,98.92 167.94,117.82 161.14,130.00 158.32,135.04 155.86,138.46 152.34,143.00 151.01,144.71 148.17,147.75 148.19,149.96 148.23,153.37 155.33,157.53 158.00,159.19 169.65,166.41 183.21,170.84 197.00,171.00 210.19,171.15 221.96,169.39 234.00,163.68 243.53,159.17 251.77,152.70 258.91,145.00 264.83,138.62 270.13,130.07 273.40,122.00 295.81,66.54 250.92,6.11 191.00,13.42 Z',
  },
];

const threeSetCircles = [
  {
    cX: 90,
    cY: 180,
    id: 'circle1',
  },
  {
    cX: 200,
    cY: 180,
    id: 'circle2',
  },
  {
    cX: 150,
    cY: 95,
    id: 'circle3',
  },
];

const threeSetCircleVennDiagramPaths = [
  {
    name: '(A)',
    path: 'M 71.00,101.00 C 71.00,101.00 85.00,99.17 85.00,99.17 96.14,98.10 109.62,101.09 120.00,105.06 125.02,106.98 131.59,110.69 136.00,113.77 138.35,115.41 142.13,118.98 145.00,118.98 147.95,118.98 153.27,114.19 156.00,112.44 164.04,107.26 168.96,105.17 178.00,102.35 190.10,98.57 201.60,98.34 214.00,100.43 214.00,100.43 229.00,104.00 229.00,104.00 229.00,85.51 228.40,71.53 218.55,55.00 190.37,7.71 124.97,2.32 89.30,44.00 74.35,61.47 71.00,78.82 71.00,101.00 Z',
  },
  {
    name: '(A&B)',
    path: 'M 71.00,103.00 C 71.00,103.00 75.44,122.00 75.44,122.00 82.21,140.65 100.46,162.42 120.00,168.00 122.23,156.16 125.42,147.27 131.81,137.00 133.72,133.94 141.84,124.42 141.81,122.04 141.76,118.04 131.30,112.30 128.00,110.43 110.07,100.23 90.81,99.44 71.00,103.00 Z',
  },
  {
    name: '(A&B&C)',
    path: 'M 169.00,172.00 C 165.08,156.09 165.50,149.61 155.28,135.00 153.35,132.24 148.61,125.20 145.00,125.20 141.76,125.20 137.92,130.59 136.16,133.00 130.43,140.84 126.05,149.59 123.63,159.00 122.98,161.54 121.46,166.15 123.04,168.49 124.63,170.86 132.17,172.24 135.00,172.72 148.01,174.89 156.14,174.31 169.00,172.00 Z',
  },
  {
    name: '(A&C)',
    path: 'M 170.00,171.00 C 179.85,170.11 191.33,163.37 199.00,157.33 205.19,152.46 211.59,145.59 215.92,139.00 220.80,131.58 224.16,124.62 226.37,116.00 227.02,113.46 228.54,108.85 226.96,106.51 225.19,103.88 216.17,102.45 213.00,102.00 198.22,99.91 183.95,100.97 170.00,106.60 164.25,108.93 157.97,112.45 153.00,116.16 151.22,117.49 148.22,119.57 148.19,122.04 148.16,124.42 156.28,133.94 158.19,137.00 164.29,146.80 169.46,159.36 170.00,171.00 Z',
  },
  {
    name: '(B)',
    path: 'M 120.00,170.00 C 94.29,158.92 71.33,132.97 70.00,104.00 60.92,104.82 51.35,110.25 44.00,115.44 15.65,135.44 4.62,171.17 14.44,204.00 24.94,239.12 57.39,259.41 93.00,259.00 106.27,258.84 119.71,254.65 131.00,247.80 133.66,246.18 140.85,241.85 141.66,238.91 142.37,236.35 139.87,233.84 138.42,232.00 133.96,226.38 131.74,223.38 128.31,217.00 120.97,203.38 117.26,185.28 120.00,170.00 Z',
  },
  {
    name: '(B&C)',
    path: 'M 121.00,171.00 C 121.00,191.37 121.66,204.01 132.81,222.00 134.87,225.31 140.87,234.80 145.00,234.80 149.13,234.80 155.13,225.31 157.19,222.00 167.46,205.43 169.00,192.97 169.00,174.00 169.00,174.00 146.00,175.91 146.00,175.91 146.00,175.91 121.00,171.00 121.00,171.00 Z',
  },
  {
    name: '(C)',
    path: 'M 230.00,107.00 C 225.71,129.77 215.03,147.51 196.00,161.09 191.61,164.23 186.00,167.52 181.00,169.55 178.67,170.49 173.40,171.82 171.99,173.70 170.56,175.61 171.07,183.07 170.72,186.00 169.60,195.30 167.58,204.43 163.69,213.00 160.90,219.13 157.19,224.67 153.11,230.00 151.68,231.87 148.16,235.64 148.19,237.96 148.23,241.37 155.33,245.53 158.00,247.19 169.65,254.41 183.21,258.84 197.00,259.00 229.27,259.37 257.55,243.82 271.68,214.00 286.27,183.22 279.18,146.72 255.00,123.01 248.66,116.80 238.60,109.46 230.00,107.00 Z',
  },
];

const fourSetEllipses = [
  {
    cX: 196,
    cY: 246,
    rX: 200,
    rY: 110,
    rotationAng: 45,
    eId: 'e4th1',
  },
  {
    cX: 266,
    cY: 176,
    rX: 200,
    rY: 110,
    rotationAng: 45,
    eId: 'e4th2',
  },
  {
    cX: 326,
    cY: 176,
    rX: 200,
    rY: 110,
    rotationAng: 135,
    eId: 'e4th3',
  },
  {
    cX: 396,
    cY: 246,
    rX: 200,
    rY: 110,
    rotationAng: 135,
    eId: 'e4th4',
  },
];

const fourSetEllipticVennDiagramPaths = [
  {
    name: '(A)',
    path: 'M 106.00,84.00 C 106.00,84.00 115.00,84.00 115.00,84.00 126.65,84.02 139.81,87.08 151.00,90.29 173.07,96.63 203.93,111.05 222.00,125.00 227.65,120.60 233.53,112.50 239.00,107.00 255.45,90.47 274.16,71.42 294.00,59.00 289.97,54.24 284.30,51.19 279.00,48.00 270.26,42.74 261.36,37.65 252.00,33.58 252.00,33.58 232.00,25.34 232.00,25.34 196.72,13.10 145.52,7.15 119.90,41.00 115.82,46.38 112.57,52.63 110.34,59.00 107.20,67.99 106.01,74.48 106.00,84.00 Z',
  },
  {
    name: '(A&B)',
    path: 'M 225.00,127.00 C 246.85,141.70 279.29,170.24 295.00,191.00 300.09,187.35 309.68,176.32 315.00,171.00 328.77,157.23 350.29,136.61 367.00,127.00 365.06,120.37 358.77,115.11 354.28,110.00 343.00,97.14 328.41,83.69 315.00,73.00 311.69,70.36 299.57,60.21 296.00,60.26 292.24,60.31 280.40,70.47 277.00,73.20 263.33,84.16 250.54,95.99 238.83,109.00 234.06,114.30 227.31,120.22 225.00,127.00 Z',
  },
  {
    name: '(A&B&C)',
    path: 'M 223.00,127.00 C 202.85,154.42 191.30,169.75 178.40,202.00 178.40,202.00 171.58,222.00 171.58,222.00 170.88,224.45 169.43,228.55 169.81,231.00 170.48,235.31 182.47,247.45 186.00,251.00 198.57,263.62 223.90,286.32 239.00,295.00 239.00,295.00 247.60,270.00 247.60,270.00 258.19,243.78 276.53,214.35 295.00,193.00 290.74,185.70 279.24,174.24 273.00,168.00 260.82,155.82 237.75,135.29 223.00,127.00 Z',
  },
  {
    name: '(A&B&C&D)',
    path: 'M 295.00,196.00 C 284.13,211.29 273.02,225.50 263.86,242.00 256.90,254.54 250.98,267.53 246.05,281.00 244.86,284.27 241.51,292.54 243.11,295.68 244.69,298.76 258.34,306.30 262.00,308.30 262.00,308.30 285.00,319.72 285.00,319.72 287.86,320.95 293.00,323.35 296.00,323.35 299.13,323.35 305.06,320.60 308.00,319.22 308.00,319.22 327.00,309.78 327.00,309.78 327.00,309.78 343.00,300.58 343.00,300.58 345.13,299.23 348.49,297.33 349.31,294.82 350.39,291.54 346.23,281.53 345.00,278.00 339.25,261.45 331.00,245.98 322.00,231.00 322.00,231.00 305.63,207.00 305.63,207.00 302.22,202.46 300.20,198.58 295.00,196.00 Z',
  },
  {
    name: '(A&B&D)',
    path: 'M 353.00,293.00 C 358.98,290.67 365.86,284.84 371.00,280.79 384.13,270.44 394.23,260.77 406.00,249.00 409.83,245.17 420.87,235.27 421.22,230.00 421.44,226.84 417.52,215.53 416.33,212.00 411.16,196.62 404.20,181.97 395.99,168.00 395.99,168.00 377.71,140.00 377.71,140.00 375.99,137.61 371.61,131.12 368.91,130.32 365.08,129.19 354.17,138.86 351.00,141.40 334.21,154.83 327.04,161.78 312.00,177.00 309.22,179.82 299.64,189.30 299.82,193.00 299.96,195.79 304.36,200.69 306.12,203.00 306.12,203.00 321.00,224.00 321.00,224.00 332.84,241.96 348.23,272.08 353.00,293.00 Z',
  },
  {
    name: '(A&C)',
    path: 'M 106.00,85.00 C 104.31,97.70 108.04,117.61 111.58,130.00 120.09,159.82 134.47,185.88 152.43,211.00 152.43,211.00 167.00,230.00 167.00,230.00 169.56,225.69 171.00,218.07 172.67,213.00 172.67,213.00 183.26,187.00 183.26,187.00 190.32,172.41 199.41,157.26 208.72,144.00 208.72,144.00 222.00,126.00 222.00,126.00 190.36,104.93 155.32,88.59 117.00,85.91 117.00,85.91 106.00,85.00 106.00,85.00 Z',
  },
  {
    name: '(A&C&D)',
    path: 'M 299.00,326.00 C 311.08,331.30 329.81,335.63 343.00,336.01 346.27,336.11 353.87,338.07 356.20,335.40 357.70,333.23 356.77,327.61 356.20,325.00 355.22,315.89 354.92,306.83 352.00,298.00 352.00,298.00 321.00,315.68 321.00,315.68 321.00,315.68 299.00,326.00 299.00,326.00 Z',
  },
  {
    name: '(A&D)',
    path: 'M 358.00,336.00 C 367.03,335.99 372.37,335.02 381.00,332.41 386.68,330.69 393.02,327.53 398.00,324.30 418.31,311.15 426.66,286.26 426.66,263.00 426.66,263.00 424.00,235.00 424.00,235.00 424.00,235.00 407.00,251.00 407.00,251.00 407.00,251.00 374.00,281.00 374.00,281.00 374.00,281.00 361.00,291.00 361.00,291.00 361.00,291.00 354.32,297.17 354.32,297.17 354.32,297.17 355.92,309.00 355.92,309.00 355.92,309.00 358.00,336.00 358.00,336.00 Z',
  },
  {
    name: '(B)',
    path: 'M 298.00,59.00 C 316.20,70.50 341.12,94.13 355.91,110.00 355.91,110.00 369.00,125.00 369.00,125.00 369.00,125.00 396.00,108.78 396.00,108.78 418.39,96.97 451.49,84.04 477.00,84.00 477.00,84.00 486.00,84.00 486.00,84.00 485.99,74.48 484.80,67.99 481.66,59.00 479.43,52.63 476.18,46.38 472.10,41.00 446.47,7.14 395.28,13.10 360.00,25.34 360.00,25.34 340.00,33.58 340.00,33.58 330.64,37.65 321.74,42.74 313.00,48.00 307.70,51.19 302.03,54.24 298.00,59.00 Z',
  },
  {
    name: '(B&C)',
    path: 'M 168.00,235.00 C 168.00,235.00 166.09,250.00 166.09,250.00 164.18,277.94 168.27,306.20 193.00,323.56 198.49,327.41 204.65,330.24 211.00,332.33 219.26,335.05 225.33,335.99 234.00,336.00 234.00,336.00 235.75,310.00 235.75,310.00 235.75,310.00 237.36,297.17 237.36,297.17 237.36,297.17 231.00,291.00 231.00,291.00 231.00,291.00 218.00,281.00 218.00,281.00 218.00,281.00 185.00,251.00 185.00,251.00 185.00,251.00 168.00,235.00 168.00,235.00 Z',
  },
  {
    name: '(B&C&D)',
    path: 'M 240.00,298.00 C 237.28,308.26 234.62,326.63 236.00,337.00 253.43,336.84 277.03,333.01 293.00,326.00 293.00,326.00 264.00,311.69 264.00,311.69 264.00,311.69 240.00,298.00 240.00,298.00 Z',
  },
  {
    name: '(B&D)',
    path: 'M 370.00,126.00 C 370.00,126.00 381.57,142.00 381.57,142.00 381.57,142.00 399.57,170.00 399.57,170.00 411.35,190.58 417.47,207.47 424.00,230.00 429.96,225.06 441.33,208.97 446.00,202.00 461.37,179.04 475.71,150.99 482.12,124.00 484.46,114.13 485.60,106.10 486.04,96.00 486.15,93.35 487.46,88.73 485.39,86.78 483.47,84.96 479.45,85.87 477.00,85.96 468.06,86.31 463.89,86.62 455.00,88.40 421.36,95.13 398.74,108.69 370.00,126.00 Z',
  },
  {
    name: '(C)',
    path: 'M 285.00,406.00 C 280.20,403.06 271.34,401.09 263.00,395.22 244.74,382.35 234.20,360.17 234.00,338.00 205.06,337.74 179.51,321.31 169.06,294.00 163.82,280.30 163.98,271.20 164.00,257.00 164.00,257.00 166.18,232.00 166.18,232.00 165.20,228.74 155.72,217.73 153.01,214.00 143.92,201.47 135.67,188.62 128.31,175.00 116.68,153.50 104.04,119.57 104.00,95.00 104.00,95.00 104.00,86.00 104.00,86.00 94.48,86.01 87.99,87.20 79.00,90.34 73.10,92.41 67.05,95.48 62.00,99.16 22.26,128.15 34.82,190.86 52.23,229.00 79.08,287.83 127.67,340.74 183.00,374.00 207.81,388.92 245.66,405.95 275.00,406.00 275.00,406.00 285.00,406.00 285.00,406.00 Z',
  },
  {
    name: '(C&D)',
    path: 'M 236.00,338.00 C 236.01,354.09 241.18,370.47 251.46,383.00 260.85,394.44 280.93,405.43 296.00,405.43 302.01,405.43 312.56,402.33 318.00,399.74 323.67,397.04 329.26,393.99 334.00,389.82 341.53,383.19 345.49,376.93 349.74,368.00 354.15,358.74 355.99,348.19 356.00,338.00 341.55,338.00 332.15,337.16 318.00,333.63 318.00,333.63 296.00,327.37 296.00,327.37 296.00,327.37 274.00,333.63 274.00,333.63 259.85,337.16 250.45,338.00 236.00,338.00 Z',
  },
  {
    name: '(D)',
    path: 'M 488.00,86.00 C 488.00,86.00 488.00,94.00 488.00,94.00 487.95,126.76 470.04,165.55 453.19,193.00 453.19,193.00 435.12,219.00 435.12,219.00 432.96,221.82 426.49,229.25 425.63,232.00 424.76,234.80 426.09,239.07 426.56,242.00 427.41,247.27 427.99,252.66 428.00,258.00 428.02,271.70 427.83,281.91 422.55,295.00 411.93,321.30 386.16,337.75 358.00,338.00 357.77,363.02 344.29,387.41 322.00,399.22 316.52,402.12 312.17,404.05 306.00,405.00 312.05,407.40 325.46,405.51 332.00,404.41 355.32,400.49 377.36,391.64 398.00,380.30 452.42,350.43 500.43,302.42 530.30,248.00 542.38,226.01 555.96,192.30 556.00,167.00 556.02,155.57 556.72,146.21 553.57,135.00 544.83,103.89 520.05,86.02 488.00,86.00 Z',
  },
];

function bindMouseEventListeners(div) {
  div
    .on('mouseover', function onMouseover() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      node.style('cursor', 'pointer');
      node.attr('fill-opacity', 0.2);

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#009fdf');
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#000000');
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ff0000');
      }
    })
    .on('mouseout', function onMouseout() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;
      if (nodeShaded === null) {
        node.attr('shaded', NOT_SHADED);
      }

      node.style('cursor', 'default');

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#ffffff');
        node.attr('fill-opacity', 0.2);
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#000000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ff0000');
        node.attr('fill-opacity', 1);
      }
    })
    .on('click', function onClick() {
      const node = d3.select(this);
      const nodeShaded = node.attr('shaded') || NOT_SHADED;

      if (nodeShaded === NOT_SHADED) {
        node.attr('fill', '#000000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === MAYBE_SHADED) {
        node.attr('fill', '#ff0000');
        node.attr('fill-opacity', 1);
      } else if (nodeShaded === SHADED) {
        node.attr('fill', '#ffffff');
        node.attr('fill-opacity', 0.2);
      }
      node.attr('shaded', (parseInt(nodeShaded, 10) + 1) % 3);
    });
}

function drawPaths(diagram, paths, mouseEventListener) {
  paths.forEach((pathEntry) => {
    const { name, path } = pathEntry;
    const appendedPath = diagram.append('path');

    appendedPath
      .attr('d', path)
      .attr('id', name)
      .attr('fill', 'white')
      .attr('fill-opacity', 0.2);

    if (mouseEventListener) {
      bindMouseEventListeners(appendedPath);
    }
  });
}

function createCircularVennDiagram(
  elementId,
  width,
  height,
  circles,
  paths,
  mouseEventListener,
) {
  function drawCircle(diagram, cX, cY, id) {
    diagram.append('circle')
      .attr('fill-opacity', 0)
      .attr('stroke', 'blue')
      .attr('stroke-width', 1)
      .attr('opacity', 1)
      .attr('fill', '#ffffff')
      .attr('r', 80)
      .attr('cx', cX)
      .attr('cy', cY)
      .attr('id', id);
  }
  const div = d3.select(`#${elementId}`);
  const diagram = div.append('svg').attr('width', width).attr('height', height);

  circles.forEach((circle) => {
    const {
      cX,
      cY,
      id,
    } = circle;
    drawCircle(diagram, cX, cY, id);
  });

  drawPaths(diagram, paths, mouseEventListener);

  return div;
}

function createTwoSetHorizontalCircularVennDiagram(elementId, mouseEventListener) {
  return createCircularVennDiagram(
    elementId,
    300,
    180,
    twoSetHorizontalCircles,
    twoSetHorizontalCircleVennDiagramPaths,
    mouseEventListener,
  );
}


function createTwoSetVerticalCircularVennDiagram(elementId, mouseEventListener) {
  return createCircularVennDiagram(
    elementId,
    175,
    280,
    twoSetVerticalCircles,
    twoSetVerticalCircleVennDiagramPaths,
    mouseEventListener,
  );
}

function createThreeSetCircularVennDiagram(elementId, mouseEventListener) {
  return createCircularVennDiagram(
    elementId,
    300,
    270,
    threeSetCircles,
    threeSetCircleVennDiagramPaths,
    mouseEventListener,
  );
}

function createFourSetEllipticVennDiagram(id, mouseEventListener) {
  function drawEllipse(diagram, cX, cY, rX, rY, rotationAng, eID) {
    const transformation = `rotate(${rotationAng} ${cX} ${cY})`;

    diagram.append('ellipse')
      .attr('cx', cX)
      .attr('cy', cY)
      .attr('rx', rX)
      .attr('ry', rY)
      .attr('id', eID)
      .attr('transform', transformation)
      .attr('fill-opacity', 0)
      .attr('stroke', 'blue')
      .attr('stroke-width', 1)
      .attr('opacity', 1)
      .attr('fill', '#ffffff');
  }

  const width = 746;
  const height = 500;

  const div = d3.select(`#${id}`);
  const diagram = div.append('svg').attr('width', width).attr('height', height);

  fourSetEllipses.forEach((ellipse) => {
    const {
      cX,
      cY,
      rX,
      rY,
      rotationAng,
      eID,
    } = ellipse;
    drawEllipse(diagram, cX, cY, rX, rY, rotationAng, eID);
  });

  drawPaths(diagram, fourSetEllipticVennDiagramPaths, mouseEventListener);

  return div;
}

function mapRegion(nodeId, a, b, c, d) {
  const sets = [];

  if (a) {
    sets.push('A');
  }

  if (b) {
    sets.push('B');
  }

  if (c) {
    sets.push('C');
  }

  if (d) {
    sets.push('D');
  }

  const setsIncluded = sets.map((set) => {
    const mappedObj = {
      set,
      included: nodeId.includes(set),
    };

    return mappedObj;
  });

  let result = '(';
  setsIncluded.forEach((mappedObj) => {
    const { set, included } = mappedObj;

    if (included) {
      let substitute;
      if (set === 'A') {
        substitute = a;
      } else if (set === 'B') {
        substitute = b;
      } else if (set === 'C') {
        substitute = c;
      } else if (set === 'D') {
        substitute = d;
      } else {
        throw new Error('Invalid set!');
      }
      result += substitute;
      result += '&';
    }
  });
  result = `${result.substring(0, result.length - 1)})`;
  return result;
}

function generateMappingObjects(div, a, b, c, d) {
  const mappedRegionToShadingMapping = {};
  const nodeRegionToMappedRegionMapping = {};
  div.selectAll('path').each(function each() {
    const node = d3.select(this);
    const nodeRegion = node.attr('id');
    const mappedRegion = mapRegion(nodeRegion, a, b, c, d);

    nodeRegionToMappedRegionMapping[nodeRegion] = mappedRegion;
    mappedRegionToShadingMapping[mappedRegion] = null;
  });

  return {
    nodeRegionToMappedRegionMapping,
    mappedRegionToShadingMapping,
  };
}

function shadeRegion(div, region, mappings, shading) {
  div.selectAll('path').each(function each() {
    const node = d3.select(this);
    const nodeRegion = node.attr('id');
    if (mappings[nodeRegion] === region) {
      switch (shading) {
        case SHADED:
          node.attr('fill', '#ff0000');
          node.attr('fill-opacity', 1);
          break;
        case MAYBE_SHADED:
          node.attr('fill', '#000000');
          node.attr('fill-opacity', 1);
          break;
        default:
          break;
      }
    }
  });
}

function applyShadings(div, premiseCollection) {
  const [a, b, c, d] = premiseCollection.terms.sort();
  const { nodeRegionToMappedRegionMapping, mappedRegionToShadingMapping } = generateMappingObjects(div, a, b, c, d);

  const resolvedColumn = premiseCollection.unifyAndResolve();
  const premiseCollectionVennDiagramParts = premiseCollection.getVennDiagramParts();

  premiseCollectionVennDiagramParts.forEach((premiseCollectionVennDiagramPart) => {
    const { compartment, vennDiagramPart } = premiseCollectionVennDiagramPart;
    const resolvedValueArray = resolvedColumn[compartment.hashCode()];

    if (resolvedValueArray.length) {
      const vennDiagramPartSplit = vennDiagramPart.split('\\');
      const leftPart = vennDiagramPartSplit[0];

      if (!(leftPart in mappedRegionToShadingMapping)) {
        throw new Error(`Shading algorithm failed! ${leftPart} not found in ${JSON.stringify(mappedRegionToShadingMapping)}`);
      }

      const shading = resolvedValueArray[0] === 'e' ? MAYBE_SHADED : SHADED;
      mappedRegionToShadingMapping[leftPart] = shading;
    }
  });
  Object.keys(mappedRegionToShadingMapping).forEach((mapping) => {
    shadeRegion(div, mapping, nodeRegionToMappedRegionMapping, mappedRegionToShadingMapping[mapping]);
  });
}

export {
  NOT_SHADED,
  MAYBE_SHADED,
  SHADED,
  TWO_SET_CIRCLES_ORIENTATION,
  createFourSetEllipticVennDiagram,
  createThreeSetCircularVennDiagram,
  createTwoSetHorizontalCircularVennDiagram,
  createTwoSetVerticalCircularVennDiagram,
  mapRegion,
  generateMappingObjects,
  shadeRegion,
  applyShadings,
  bindMouseEventListeners,
};
