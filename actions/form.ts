"use server";
import { db } from "@/db";
import { ContactSchema, ContactSchemaType } from "@/schemas/contact";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
class UserNotFoundErr extends Error {}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
  });
}

export async function GetContactById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.contact.findFirst({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  console.log("jsonContent", jsonContent);

  return await db.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await db.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await db.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const form = await db.form.create({
    data: {
      userId: user.id,
      name: name,
      description: description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }

  return form.id;
}

export async function CreateContact(data: ContactSchemaType) {
  const validation = ContactSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { email, firstName, lastName, phoneNumber } = data;

  const contact = await db.contact.create({
    data: {
      userId: user.id,
      firstName,
      lastName,
      email,
      phoneNumber,
    },
  });

  if (!contact) {
    throw new Error("Something went wrong");
  }

  return contact.id;
}

export async function UpdateContact(id: number, data: ContactSchemaType) {
  const validation = ContactSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { email, firstName, lastName, phoneNumber } = data;

  const contact = await db.contact.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      userId: user.id,
      firstName,
      lastName,
      email,
      phoneNumber,
    },
  });

  if (!contact) {
    throw new Error("Something went wrong");
  }

  return contact.id;
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
