export const getAISuggestion = (completionPercentage, currentHour, tasks) => {
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  if (completionPercentage === 0 && pendingTasks > 0) {
    return {
      message: "🌟 لم تبدأ بعد! ابدأ بأصغر مهمة لتحقق أول إنجاز اليوم.",
      type: "motivation",
    };
  }
  
  if (completionPercentage < 30 && pendingTasks > 3) {
    return {
      message: "📊 يبدو أن هناك العديد من المهام المتبقية. حاول تقسيم المهام الكبيرة إلى خطوات أصغر.",
      type: "advice",
    };
  }
  
  if (completionPercentage > 70 && currentHour < 20) {
    return {
      message: "🎉 أداء رائع! لديك وقت إضافي، هل تود قراءة صفحة إضافية من القرآن أو الاستماع لمحاضرة؟",
      type: "reward",
    };
  }
  
  if (currentHour >= 22 && pendingTasks > 0) {
    return {
      message: "🌙 الوقت متأخر. ركز على أهم مهمة متبقية واترك الباقي للغد مع وضع نية صالحة.",
      type: "reminder",
    };
  }
  
  if (pendingTasks === 0 && completionPercentage === 100) {
    return {
      message: "🏅 مبارك! أكملت جميع مهامك اليوم. أنت بطل حقيقي! استثمر وقتك في العبادة النافلة.",
      type: "celebration",
    };
  }
  
  return {
    message: "💪 استمر على بركة الله، كل خطوة صغيرة تقربك من أهدافك.",
    type: "general",
  };
};
