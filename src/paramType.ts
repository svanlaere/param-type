const toString: () => string = Object.prototype.toString;

/**
 * @author kmdrGroch
 * @returns Real type of element
 */
const paramType = (p: any): string => {
  if (p === undefined) { return 'undefined'; }
  if (p === null) { return 'null'; }

  const t: string = typeof p;
  switch (t) {
    case 'function':
      return p.constructor.name === 'GeneratorFunction' ? 'generatorfunction' : 'function';
    case 'object':
      if (Array.isArray(p)) { return 'array'; }
      if (p instanceof Error) { return p.name.toLowerCase(); }
      if (p instanceof Date) { return 'date'; }
      if (p instanceof RegExp) { return 'regexp'; }
      if (p instanceof Buffer) { return 'buffer'; }

      const c: any = p.constructor;

      if (c === undefined) { return 'object'; }

      switch (c.name) {
        case 'Symbol': return 'symbol';
        case 'Promise': return 'promise';
        case 'WeakMap': return 'weakmap';
        case 'WeakSet': return 'weakset';
        case 'Map': return 'map';
        case 'Set': return 'set';
        case 'Int8Array': return 'int8array';
        case 'Uint8Array': return 'uint8array';
        case 'Uint8ClampedArray': return 'uint8clampedarray';
        case 'Int16Array': return 'int16array';
        case 'Uint16Array': return 'uint16array';
        case 'Int32Array': return 'int32array';
        case 'Uint32Array': return 'uint32array';
        case 'Float32Array': return 'float32array';
        case 'Float64Array': return 'float64array';
      }
      if (toString.call(c) === '[object Function]' && String(c).startsWith('class')) { return 'class'; }

      return toString.call(p).slice(8, -1).toLowerCase().replace(' ', '');
    default:
      return t;
  }
};

export default paramType;
