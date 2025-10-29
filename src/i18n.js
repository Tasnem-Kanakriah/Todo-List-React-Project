import i18n from "i18next";
import {
    initReactI18next
} from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    to_do_list: 'To Do List',
                    add: 'Add',
                    add_placeholder: 'Add a new rask',
                    all: 'All',
                    done: 'Done',
                    un_done: 'Undone',
                    delete: 'Delete',
                    cancel: 'Cancel',
                    save: 'Save',
                    confirm_delete_task: 'Confirm task deletion?',
                    rename_task: 'Rename Task!',
                    task_done: 'Task completed',
                    task_undone: 'Task not completed',
                    task_edited: 'Task was Edit',
                    task_deleted: 'Task was deleted'
                },
            },
            ar: {
                translation: {
                    to_do_list: 'قائمة المهام',
                    add: 'إضافة',
                    add_placeholder: 'إضافة مهمة جديدة',
                    all: 'الكل',
                    done: 'المنجزة',
                    un_done: 'الغير منجزة',
                    delete: 'حذف',
                    cancel: 'إلغاء',
                    save: 'حفظ',
                    confirm_delete_task: "تأكيد حذف المهمة؟",
                    rename_task: 'إعادة تسمية المهمة!',
                    task_done: 'المهمة غير منجزة',
                    task_undone: 'تم إنجاز المهمة',
                    task_edited: 'تم تعديل المهمة',
                    task_deleted: 'تم حذف المهمة'
                },
            },
        },
        lng: localStorage.getItem("language"), 
        fallbackLng: "ar",
        // interpolation: {
        //     escapeValue: false,
        // },
    });

export default i18n;