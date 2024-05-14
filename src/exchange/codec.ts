import base64url from 'base64url';

const computeBlockSize = (maxValue: number): number => {
  let blockSize = 1;
  let power = 2;
  
  while(power <= maxValue) {
    power *= 2;
    blockSize++;
  }
  
  return blockSize;
}

export const encode = (data: number[]): string => {
  const blockSize = computeBlockSize(Math.max(...data));
  const bits = data
    .map((value) => value.toString(2).padStart(blockSize, '0'))
    .join('');

  const bytes = [];
  for(let i = 0; i < bits.length; i += 8) {
    const chunk = bits.slice(i, i + 8);
    const byte = chunk.length < 8 ? chunk.padEnd(8, '0') : chunk;

    bytes.push(parseInt(byte, 2));
  }

  return `${blockSize}.${data.length}.${base64url.encode(Buffer.from(bytes))}`;
};

export const decode = (code: string): number[] => {
  const parts = code.split('.');
  const blockSize = Number(parts[0]);
  const size = Number(parts[1]);

  const bytes = Array.from(
    base64url.toBuffer(parts[2]).values()
  );

  const bits = bytes.map((byte) => byte.toString(2).padStart(8, '0')).join('');
  const result: number[] = Array(size);
  
  for(let i = 0; i < size; i++) {
    const offset = i * blockSize;
    result[i] = parseInt(bits.slice(offset, offset + blockSize), 2);
  }

  return result;
} 
