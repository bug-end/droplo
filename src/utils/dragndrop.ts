import { NavigationItem } from '@/types/navigation';

export const flattenTree = (
  nodes: NavigationItem[],
  parentId: string | null = null
): (NavigationItem & { parentId: string | null })[] => {
  return nodes.reduce<(NavigationItem & { parentId: string | null })[]>((acc, node) => {
    acc.push({ ...node, parentId });
    if (node.children && node.children.length > 0) {
      acc = acc.concat(flattenTree(node.children, node.id));
    }
    return acc;
  }, []);
};

export const reconstructTree = (
  flatNodes: (NavigationItem & { parentId: string | null })[],
  parentId: string | null = null
): NavigationItem[] => {
  return flatNodes
    .filter((node) => node.parentId === parentId)
    .map((node) => ({
      ...node,
      children: reconstructTree(flatNodes, node.id),
    }));
};
