import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

// TODO: remove once connected to backend
const dummyData = [
  {
    id: "1",
    name: "A",
    created: "2024-03-01",
    type: "Form",
    comments: "blah blah",
  },
  {
    id: "2",
    name: "B",
    created: "2024-03-02",
    type: "Form",
    comments: "blah blah",
  },
  {
    id: "3",
    name: "C",
    created: "2024-03-03",
    type: "Form",
    comments: "blah blah",
  },
];

const DocumentDirectoryTable = () => {
  const documents = dummyData; // TODO: replace with call to backend

  const [selectedDocumentIds, setSelectedDocumentIds] = useState<Set<string>>(
    new Set(),
  );

  const changeRowCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.id;
    const isChecked = event.target.checked;
    if (isChecked) {
      selectedDocumentIds.add(selectedId);
    } else {
      selectedDocumentIds.delete(selectedId);
    }
    setSelectedDocumentIds((prev) => new Set(prev));
  };

  const changeAllCheckboxes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedDocumentIds(new Set(documents.map((document) => document.id)));
    } else {
      setSelectedDocumentIds(new Set());
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={selectedDocumentIds.size === documents.length}
                  onChange={changeAllCheckboxes}
                />
              </Th>
              <Th>NAME</Th>
              <Th>CREATED ON</Th>
              <Th>TYPE</Th>
              <Th>COMMENTS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents.map((document) => {
              return (
                <Tr key={document.id}>
                  <Td>
                    <Checkbox
                      id={document.id}
                      isChecked={selectedDocumentIds.has(document.id)}
                      onChange={changeRowCheckbox}
                    />
                  </Td>
                  <Td>{document.name}</Td>
                  <Td>{document.created}</Td>
                  <Td>{document.type}</Td>
                  <Td>{document.comments}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <Button onClick={() => console.log(selectedDocumentIds)}>
        Log selected document ids!
      </Button>
    </>
  );
};

export default DocumentDirectoryTable;
