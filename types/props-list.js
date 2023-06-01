/** @typedef {{type: any, description?: string, defaultValue?: any, required?: boolean, min?: number, max?: number, step?: number}} BaseProp */
/** @typedef {{name: string, group: string} & BaseProp} Prop */

/** @typedef {{[group]: string} & {[propName: string] : BaseProp}} PropGroup */

/**
 * @param {{[groupName: string] : PropGroup}} list
 * @returns {Prop[]}
 */
export function propsList(list) {
  const props = [];
  for (const [groupName, group] of Object.entries(list)) {
    for (const [name, info] of Object.entries(group)) {
      props.push({
        name,
        group: groupName,
        ...info,
      });
    }
  }
  return props;
}
