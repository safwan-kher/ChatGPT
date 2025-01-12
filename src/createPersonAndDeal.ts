export const createPersonAndDeal = async ({
  firstName,
  lastName,
  email,
  pipedriveStageId,
  customFields,
  courseName,
}: {
  firstName: string;
  lastName: string;
  email: string;
  pipedriveStageId: string;
  customFields: any;
  courseName: string;
}) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "Course Package Download",
    courseName: courseName,
  });
  await fetch("/api/create-person-and-deal", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${firstName} ${lastName}`,
      email: [email],
      stageId: Number(pipedriveStageId),
      ...customFields,
      ...(customFields.phone && { phone: [customFields.phone] }),
    }),
  });
};
