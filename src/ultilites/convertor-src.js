import srcImgCollection from './src-img-collection';
import { priorityTask } from './field-task';

const srcPriority = (priority) => {
  if (priority === priorityTask.high) return srcImgCollection.priority.high;
  if (priority === priorityTask.medium) return srcImgCollection.priority.medium;
  return srcImgCollection.priority.low;
};
export default srcPriority;
