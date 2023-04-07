/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  createElem,
  createDiv,
  createText,
  createBtn,
  createInput,
  createInputRadio,
  createLabel,

} from '../ultilites/create-element';
import { getElement } from '../ultilites/get-element';
import { taskStatusObj, priorityTask } from '../ultilites/field-task';

class CreateTaskView {
  constructor(id) {
    this.id = id;
  }

  bindCloseModal(handler) {
    const btnCloseModal = getElement('.form__btn_close');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.removeItem('editTask');
        localStorage.removeItem('pathEdit');

        handler();
      });
    }
  }

  bindGetDataFormModal(handler) {
    const myForm = document.forms.formTask;
    if (myForm) {
      myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const newTask = {
          name: myForm.elements.titleTask.value,
          description: myForm.elements.description.value,
          assignee: myForm.elements.assignee.value,
          status: myForm.elements.status.value,
          priority: myForm.elements.priority.value,
          isPrivate: myForm.elements.privacy.value === 'true',
        };
        const isEditTask = localStorage.getItem('editTask');
        if (isEditTask) {
          const idEditTask = (JSON.parse(isEditTask)).id;
          handler(newTask, idEditTask);
        } else {
          handler(newTask, false);
        }
      });
    }
  }

  resetForm(event) {
    const btn = event.target;
    event.stopPropagation();
    if (btn) {
      getElement('.form__task').reset();
      getElement('#todo1').checked = true;
      getElement('#low1').checked = true;
      getElement('#privacy1').checked = true;
    }
  }

  settingRadioEditTask() {
    const checkedTask = JSON.parse(localStorage.getItem('editTask'));
    if (checkedTask) {
      const select = document.querySelector('#select').getElementsByTagName('option');
      for (let i = 0; i < select.length; i++) {
        if (select[i].value === checkedTask.assignee.id) select[i].selected = true;
      }
      if (checkedTask.name) getElement('#titleTask').value = checkedTask.name;
      if (checkedTask.description) getElement('#description1').value = checkedTask.description;

      if (checkedTask.priority === priorityTask.high) {
        getElement('#heigh1').checked = true;
      }
      if (checkedTask.priority === priorityTask.medium) getElement('#medium1').checked = true;
      if (checkedTask.priority === priorityTask.low) getElement('#low1').checked = true;

      if (checkedTask.status === taskStatusObj.toDo) getElement('#todo1').checked = true;
      if (checkedTask.status === taskStatusObj.inProgress) getElement('#inProcess1').checked = true;
      if (checkedTask.status === taskStatusObj.complete) getElement('#completed1').checked = true;

      if (checkedTask.isPrivate) getElement('#privacy1').checked = true;
      if (!checkedTask.isPrivate) getElement('#public1').checked = true;
    } else {
      getElement('#todo1').checked = true;
      getElement('#low1').checked = true;
      getElement('#privacy1').checked = true;
    }
  }

  display() {
    const users = JSON.parse(localStorage.getItem('allUsers'));
    const parentElem = document.getElementById(this.id);
    const main = createElem('section', ['container_Modal_create_task']);
    main.id = 'create_task';
    const wrapper = createDiv(['wrapper__cteate_task']);
    const section = createElem('section', ['container__create_task']);
    section.id = 'create_task';

    const containerForm = createDiv(['container__form_task']);
    const formTitle = createText('h4', `${localStorage.getItem('editTask') ? 'Edit Task' : 'Create new Task'}`, ['form__task_title']);
    const closeModalBtn = createBtn('X', ['form__btn_close'], 'button', 'close modal');

    const myForm = createElem('form', ['form__task']);
    myForm.name = 'formTask';
    const containerInputTask = createDiv(['container__input_task']);
    const labelInfo = createLabel('titleTask', 'Title', ['label__task_info']);
    const inputInfo = createInput('text', ['input__task_info'], 'Enter title task');
    inputInfo.id = 'titleTask';
    inputInfo.name = 'titleTask';
    inputInfo.setAttribute('required', true);
    containerInputTask.append(labelInfo, inputInfo);

    const containerLineSecond = createDiv(['container__line_second']);
    const containerInputSecond = createDiv(['container__input_second']);

    const selectText = createText('p', '', ['select_text']);
    const select = createElem('select', ['container_select']);
    select.id = 'select';
    select.name = 'assignee';
    users.forEach((user) => {
      const option = createElem('option', ['option']);
      option.value = user.id;
      option.textContent = user.userName;
      select.append(option);
    });
    selectText.append(select);
    const labeUserName = createLabel('userName', 'Assignee', ['label__task_info']);
    // const userNameInput = createInput('text', ['input__task_info', 'userName'], 'Enter Name');
    // userNameInput.name = 'userNameData';
    // userNameInput.id = 'userNameData';
    // userNameInput.setAttribute('required', true);
    containerInputSecond.append(labeUserName, selectText);
    const containerInputSecond2 = createDiv(['container__input_second']);
    const privacyText = createText('p', 'Privacy', ['label__task_info']);
    const containerRadios = createDiv(['container__radios']);
    const containerRadioPrivate = createDiv(['container__radio']);
    const radioPrivacy = createInputRadio('radio', 'privacy', true, 'privacy1', false, ['input__task_info']);
    const labePrivate = createLabel('privacy1', 'Private', ['label__task_info', 'radio_label']);
    containerRadioPrivate.append(radioPrivacy, labePrivate);
    const containerRadioPublic = createDiv(['container__radio']);
    const radioPublic = createInputRadio('radio', 'privacy', false, 'public1', false, ['input__task_info']);
    const labePublic = createLabel('public1', 'Public', ['label__task_info', 'radio_label']);
    containerRadioPublic.append(radioPublic, labePublic);
    containerRadios.append(containerRadioPrivate, containerRadioPublic);
    containerInputSecond2.append(privacyText, containerRadios);
    containerLineSecond.append(containerInputSecond, containerInputSecond2);

    const containerStatus = createDiv(['container__input_status']);
    const statusText = createText('p', 'Status', ['label__task_info', 'label_width']);
    const containerStatus2 = createDiv(['container__radios', 'status_container']);
    const containerTodo = createDiv(['container__radio']);
    const radioToDo = createInputRadio('radio', 'status', taskStatusObj.toDo, 'todo1', false, ['input__task_info']);
    const labelTodo = createLabel('todo1', 'To Do', ['label__task_info', 'radio_label']);
    containerTodo.append(radioToDo, labelTodo);
    const containerProgress = createDiv(['container__radio']);
    const radioProcess = createInputRadio('radio', 'status', taskStatusObj.inProgress, 'inProcess1', false, ['input__task_info']);
    const labelProcess = createLabel('inProcess1', 'In progress', ['label__task_info', 'radio_label']);
    containerProgress.append(radioProcess, labelProcess);
    const containerComplete = createDiv(['container__radio']);
    const radioComplete = createInputRadio('radio', 'status', taskStatusObj.complete, 'completed1', false, ['input__task_info']);
    const labelComplete = createLabel('completed1', 'Completed', ['label__task_info', 'radio_label']);
    containerComplete.append(radioComplete, labelComplete);
    containerStatus2.append(containerTodo, containerProgress, containerComplete);
    containerStatus.append(statusText, containerStatus2);

    const containerPriority = createDiv(['container__input_status']);
    const priorityText = createText('p', 'Priority', ['label__task_info', 'label_width']);
    const containerPriority2 = createDiv(['container__radios', 'status_container']);
    const containerheight = createDiv(['container__radio']);
    const radioHigh = createInputRadio('radio', 'priority', priorityTask.high, 'heigh1', false, ['input__task_info']);
    const labelHight = createLabel('heigh1', 'Heigh', ['label__task_info', 'radio_label']);
    containerheight.append(radioHigh, labelHight);
    const containerMedium = createDiv(['container__radio']);
    const radioMedium = createInputRadio('radio', 'priority', priorityTask.medium, 'medium1', false, ['input__task_info']);
    const labelMedium = createLabel('medium1', 'Medium', ['label__task_info', 'radio_label']);
    containerMedium.append(radioMedium, labelMedium);
    const containerLow = createDiv(['container__radio']);
    const radioLow = createInputRadio('radio', 'priority', priorityTask.low, 'low1', false, ['input__task_info']);
    const labelLow = createLabel('low1', 'Low', ['label__task_info', 'radio_label']);
    containerLow.append(radioLow, labelLow);
    containerPriority2.append(containerLow, containerMedium, containerheight);
    containerPriority.append(priorityText, containerPriority2);

    const containerArea = createDiv(['container__input_task']);
    const labelLArea = createLabel('description1', 'Description', ['label__task_info']);
    const area = createElem('textArea', ['input__task_info', 'area__task_description']);
    area.maxlength = '280';
    area.id = 'description1';
    area.name = 'description';
    area.setAttribute('required', true);
    containerArea.append(labelLArea, area);

    const containerBtn = createDiv(['form__task_btns']);
    const btnReset = createBtn('Reset', ['light_btn', 'btn', 'form__task_btn'], 'button', 'reset data');
    btnReset.addEventListener('click', this.resetForm);
    const btnSave = createBtn('Save', ['light_btn', 'btn', 'form__task_btn', 'submit_create'], 'submit', 'save new task');
    containerBtn.append(btnReset, btnSave);

    myForm.append(
      containerInputTask,
      containerLineSecond,
      containerStatus,
      containerPriority,
      containerArea,
      containerBtn,
    );
    containerForm.append(formTitle, closeModalBtn, myForm);
    section.append(containerForm);
    main.append(wrapper, section);
    parentElem.replaceWith(main);
    this.settingRadioEditTask();
  }
}
export default CreateTaskView;
