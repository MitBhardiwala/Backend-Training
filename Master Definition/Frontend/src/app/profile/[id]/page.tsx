import { getUserDetailsById } from "@/app/lib/services/user/user";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const userData = await getUserDetailsById(id);
  const user = userData.data;
  return (
    <>
      <div>
        <p>{user.id}</p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.gender}</p>
        <p>{user.department}</p>
        <p>{user.class}</p>
        <p>{user.phone}</p>
        <p>{user.address}</p>
        <p>{user.grNumber ?? ""}</p>
      </div>
    </>
  );
}
